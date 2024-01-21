# GHOPay

Decentralised Loyalty Reward System by leveraging GHO across chains.

![Flow](flow.png)

## Description

GHOPay is a decentralized loyalty reward system leveraging the GHO Token across chains.

GHOPay acts as an entity issuing GHO Passports to users who want to utilize and experience the services provided by GHOPay and its partners across chains.

GHOPay is a loyalty reward system that rewards customers on every* transaction.
- Customer start their journey by purchasing our GHO Passport (SBT) for $500.
- These $500 are then staked to the MainVault, and the customer keeps earning rewards on this lifetime.
- Then, for every TXN customer made, they are rewarded with GHO Points (GP), which they can utilize to get discounts from our partners.
- Customers can swap the GP to any Reward Point (RP) from our in-house Liquidity Pool and utilize those RPs to avail discounts from the respective partner.

Partner like Airlines, Hotels, etc, partnered with GHOPay to create a loyalty reward system for their esteemed customers. 
- A Partner starts by purchasing a GHO Partner Passport for $2000.
- They continue by staking GHO and minting their proportionate Reward Points (RP).
- A Partner then provides their RP to the Liquidity Pool with proportion to GP.
- A Partner will earn whenever a customer utilizes their services from our platform.

GHOPay as a business earns fees when
- A customer purchases our GHO Passport.
- A customer swaps their RPs using our Liquidity Pool.
- A customer withdraws their GP in exchange for GHO.
- A customer withdraws their RP in exchange for GHO.
- A partner withdraws their GP in exchange for GHO.
- A partner purchases our GHO Partner Passport.

## How it's made

It's made using EIP 4626, CCIP, and GHO.

We have utilized EIP4626 to generate interest in users' and partners' staked amounts. 

We have utilized Chainlink CCIP for 
- verification of cross-chain verification of GHO Passport and GHO Partner Passport.

We have GHO as an underlying asset in both Main and Partner Vault. The GHO present in GHO both contracts are staked into custom strategic yield-generating contracts.

## Contract Addresses 

- TestGHO: [0xBdD9c513Be2514F83B72761503F0be2134ec6A1a](https://sepolia.etherscan.io/address/0xbdd9c513be2514f83b72761503f0be2134ec6a1a)
- GHOPassport: [0x17206705E75249B2Cb885423937e88Fc8f068338](https://sepolia.etherscan.io/address/0x17206705E75249B2Cb885423937e88Fc8f068338)
- GHOPartnerPassport: [0xEa9b91D90ff3e904EcF230296D88c30c78E1E4c8](https://sepolia.etherscan.io/address/0xEa9b91D90ff3e904EcF230296D88c30c78E1E4c8)
- Utils: [0xd133748f76030B535715b6954a81442e8bc3725b](https://sepolia.etherscan.io/address/0xd133748f76030B535715b6954a81442e8bc3725b)
- RPool: [0xab6FF5bC1747bD1e7828Cf4dE87c1347D27E62E1](https://sepolia.etherscan.io/address/0xab6FF5bC1747bD1e7828Cf4dE87c1347D27E62E1)
- MainVault: [0x44dc28ea5A729c6235D50bbA2a25e92D5D242149](https://sepolia.etherscan.io/address/0x44dc28ea5A729c6235D50bbA2a25e92D5D242149)
- MainPayment: [0xe2Dc1E2716B8E06B9Ed0b4498ddAfa2260F32BEA](https://sepolia.etherscan.io/address/0xe2Dc1E2716B8E06B9Ed0b4498ddAfa2260F32BEA)
- PartnerContractsDeployer: [0x4d67B362365a618ac3E01827402f1f5B71566cc7](https://sepolia.etherscan.io/address/0x4d67B362365a618ac3E01827402f1f5B71566cc7)

## Built by 

- [LPircy](https://x.com/0xLPircy)
- [Danish](https://x.com/danisharora099)
- [Lucifer](https://x.com/Lucifer0x17)
- [Megabyte](https://x.com/megabyte0x)