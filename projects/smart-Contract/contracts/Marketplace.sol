// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SecureMarketplace {
    // ----------- Custom Errors -----------
    error NotSeller();
    error NotBuyer();
    error InvalidStatus();

    // ----------- Enum -----------
    enum TradeStatus {
        None,
        Listed,
        Funded,
        Shipped,
        Completed,
        Cancelled,
        Disputed,
        Resolved
    }

    // ----------- Struct -----------
    struct Trade {
        address seller;
        address buyer;
        uint256 price;
        TradeStatus status;
    }

    // ----------- Storage -----------
    mapping(uint256 => Trade) public trades;
    uint256 public nextTradeId;
    address public admin;

    // ----------- Events -----------
    event TradeCreated(uint256 indexed tradeId, address indexed seller, uint256 price);
    event TradeFunded(uint256 indexed tradeId, address indexed buyer, uint256 amount);
    event TradeShipped(uint256 indexed tradeId);
    event TradeCompleted(uint256 indexed tradeId);
    event TradeCancelled(uint256 indexed tradeId);
    event TradeDisputed(uint256 indexed tradeId);
    event TradeResolved(uint256 indexed tradeId, bool refundedBuyer);

    // ----------- Modifiers -----------
    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotSeller();
        _;
    }

    modifier onlySeller(uint256 tradeId) {
        if (msg.sender != trades[tradeId].seller) revert NotSeller();
        _;
    }

    modifier onlyBuyer(uint256 tradeId) {
        if (msg.sender != trades[tradeId].buyer) revert NotBuyer();
        _;
    }

    modifier tradeExists(uint256 tradeId) {
        require(trades[tradeId].seller != address(0), "Trade does not exist");
        _;
    }

    // ----------- Constructor -----------
    constructor() {
        admin = msg.sender;
    }

    // ----------- Functions -----------

    function createTrade(uint256 price) external returns (uint256 tradeId) {
        require(price > 0, "Price must be > 0");

        tradeId = nextTradeId;
        nextTradeId++;

        trades[tradeId] = Trade({
            seller: msg.sender,
            buyer: address(0),
            price: price,
            status: TradeStatus.Listed
        });

        emit TradeCreated(tradeId, msg.sender, price);
    }

    function fundTrade(uint256 tradeId)
        external
        payable
        tradeExists(tradeId)
    {
        Trade storage t = trades[tradeId];

        if (t.status != TradeStatus.Listed) revert InvalidStatus();
        require(t.buyer == address(0), "Already funded");
        require(msg.value == t.price, "Incorrect value");

        t.buyer = msg.sender;
        t.status = TradeStatus.Funded;

        emit TradeFunded(tradeId, msg.sender, msg.value);
    }

    function markShipped(uint256 tradeId)
        external
        tradeExists(tradeId)
        onlySeller(tradeId)
    {
        Trade storage t = trades[tradeId];
        if (t.status != TradeStatus.Funded) revert InvalidStatus();

        t.status = TradeStatus.Shipped;

        emit TradeShipped(tradeId);
    }

    function confirmReceived(uint256 tradeId)
        external
        tradeExists(tradeId)
        onlyBuyer(tradeId)
    {
        Trade storage t = trades[tradeId];
        if (t.status != TradeStatus.Shipped) revert InvalidStatus();

        t.status = TradeStatus.Completed;

        (bool ok, ) = t.seller.call{value: t.price}("");
        require(ok, "Transfer failed");

        emit TradeCompleted(tradeId);
    }

    function cancelBeforeShipped(uint256 tradeId)
        external
        tradeExists(tradeId)
    {
        Trade storage t = trades[tradeId];

        if (t.status != TradeStatus.Funded) revert InvalidStatus();
        if (msg.sender != t.buyer) revert NotBuyer();

        t.status = TradeStatus.Cancelled;

        (bool ok, ) = t.buyer.call{value: t.price}("");
        require(ok, "Refund failed");

        emit TradeCancelled(tradeId);
    }

    function openDispute(uint256 tradeId)
        external
        tradeExists(tradeId)
        onlyBuyer(tradeId)
    {
        Trade storage t = trades[tradeId];
        if (t.status != TradeStatus.Shipped) revert InvalidStatus();

        t.status = TradeStatus.Disputed;

        emit TradeDisputed(tradeId);
    }

    function resolveDispute(uint256 tradeId, bool refundBuyer)
        external
        tradeExists(tradeId)
        onlyAdmin
    {
        Trade storage t = trades[tradeId];
        if (t.status != TradeStatus.Disputed) revert InvalidStatus();

        t.status = TradeStatus.Resolved;

        address recipient = refundBuyer ? t.buyer : t.seller;

        (bool ok, ) = recipient.call{value: t.price}("");
        require(ok, "Payout failed");

        emit TradeResolved(tradeId, refundBuyer);
    }
}
