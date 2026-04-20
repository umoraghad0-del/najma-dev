# Secure Marketplace – Smart Contract (Solidity)

## Overview
This project is a decentralized marketplace smart contract built in Solidity. It implements an escrow system that enables secure transactions between buyers and sellers.

Funds are held in the contract until both parties confirm the transaction, ensuring trust without relying on a centralized intermediary.

---

## Key Features
- Create a trade (seller lists an item with a price)
- Buyer funds the trade (escrow)
- Buyer can cancel before shipment
- Seller marks item as shipped
- Buyer confirms delivery → payment is released
- Dispute system for handling conflicts
- Admin resolves disputes

---

## Technical Implementation
The contract includes:

- **Struct (`Trade`)** – stores transaction data  
- **Enum (`TradeStatus`)** – tracks trade lifecycle  
- **Mapping** – stores all trades  
- **Modifiers** – control access and enforce rules  
- **Events** – emit important state changes  
- **Constructor** – sets contract administrator  

---

## Smart Contract Flow
1. Seller creates a listing  
2. Buyer funds the trade  
3. Seller ships the item  
4. Buyer confirms delivery  
5. Payment is released  

If issues occur:
- A dispute can be opened  
- Admin resolves and sends funds to correct party  

---

## Testing
The contract is tested using:

- Hardhat  
- TypeScript  
- Mocha  

Tests cover:
- Creating trades  
- Funding transactions  
- Cancelling trades  
- Completing full transactions  
- Dispute handling  
- Access control  

---

## My Contribution
I designed and implemented the full smart contract, including the escrow logic, trade lifecycle, and dispute resolution system. I also wrote tests to verify functionality and ensure correct behavior.

---

## What I Learned
- Writing smart contracts in Solidity  
- Designing secure escrow systems  
- Managing contract state using enums and mappings  
- Writing and running tests with Hardhat  
- Thinking about edge cases in financial logic  

---

## Challenges
One of the biggest challenges was designing the trade lifecycle so that funds could never be locked in the contract. I had to carefully handle different states and edge cases to ensure the contract remained secure and predictable.

---

## Future Improvements
- Add frontend interface (DApp)
- Improve security with additional validation
- Optimize gas usage
- Add multi-signature dispute resolution

---

## Project Type
Smart Contract / Web3 Backend

---

## Author
Najma Hasan 
Blockchain Development Student