import { expect } from "chai";
import { ethers } from "hardhat";

describe("SecureMarketplace", function () {
  async function deployFixture() {
    const [admin, seller, buyer, other] = await ethers.getSigners();

    const Marketplace = await ethers.getContractFactory("SecureMarketplace");
    const marketplace = await Marketplace.connect(admin).deploy();
    await marketplace.waitForDeployment();

    return { marketplace, admin, seller, buyer, other };
  }

  it("ska skapa en trade med rätt värden", async function () {
    const { marketplace, seller } = await deployFixture();

    const price = ethers.parseEther("1");

    await marketplace.connect(seller).createTrade(price);

    const trade = await marketplace.trades(0);
    expect(trade.seller).to.equal(seller.address);
    expect(trade.price).to.equal(price);
    expect(trade.status).to.equal(1n); // Listed
  });

  it("ska låta köpare fund:a trade och hålla pengarna i kontraktet", async function () {
    const { marketplace, seller, buyer } = await deployFixture();

    const price = ethers.parseEther("1");
    await marketplace.connect(seller).createTrade(price);

    await marketplace.connect(buyer).fundTrade(0, { value: price });

    const trade = await marketplace.trades(0);
    expect(trade.buyer).to.equal(buyer.address);
    expect(trade.status).to.equal(2n); // Funded
  });

  it("ska låta säljaren markera skickad och köparen bekräfta mottagen", async function () {
    const { marketplace, seller, buyer } = await deployFixture();

    const price = ethers.parseEther("1");
    await marketplace.connect(seller).createTrade(price);
    await marketplace.connect(buyer).fundTrade(0, { value: price });

    await marketplace.connect(seller).markShipped(0);

    const sellerBalanceBefore = await ethers.provider.getBalance(seller.address);

    const tx = await marketplace.connect(buyer).confirmReceived(0);
    const receipt = await tx.wait();
    const gasUsed = receipt!.gasUsed * receipt!.gasPrice!;

    const sellerBalanceAfter = await ethers.provider.getBalance(seller.address);

    expect(sellerBalanceAfter - sellerBalanceBefore).to.equal(price);

    const trade = await marketplace.trades(0);
    expect(trade.status).to.equal(4n); // Completed
  });

  it("ska kunna avbrytas av köparen innan skickad", async function () {
    const { marketplace, seller, buyer } = await deployFixture();

    const price = ethers.parseEther("1");
    await marketplace.connect(seller).createTrade(price);
    await marketplace.connect(buyer).fundTrade(0, { value: price });

    const buyerBalanceBefore = await ethers.provider.getBalance(buyer.address);

    const tx = await marketplace.connect(buyer).cancelBeforeShipped(0);
    const receipt = await tx.wait();
    const gasUsed = receipt!.gasUsed * receipt!.gasPrice!;

    const buyerBalanceAfter = await ethers.provider.getBalance(buyer.address);

    expect(buyerBalanceAfter + gasUsed - buyerBalanceBefore).to.equal(price);

    const trade = await marketplace.trades(0);
    expect(trade.status).to.equal(5n); // Cancelled
  });

  it("ska låta admin lösa tvist", async function () {
    const { marketplace, admin, seller, buyer } = await deployFixture();

    const price = ethers.parseEther("1");
    await marketplace.connect(seller).createTrade(price);
    await marketplace.connect(buyer).fundTrade(0, { value: price });
    await marketplace.connect(seller).markShipped(0);
    await marketplace.connect(buyer).openDispute(0);

    const buyerBalanceBefore = await ethers.provider.getBalance(buyer.address);

    await marketplace.connect(admin).resolveDispute(0, true);

    const buyerBalanceAfter = await ethers.provider.getBalance(buyer.address);

    expect(buyerBalanceAfter).to.be.greaterThan(buyerBalanceBefore);

    const trade = await marketplace.trades(0);
    expect(trade.status).to.equal(7n); // Resolved
  });
});
