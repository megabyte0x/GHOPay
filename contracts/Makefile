-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil 

DEFAULT_ANVIL_KEY := 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""
	@echo ""
	@echo "  make fund [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

install :; forge install cyfrin/foundry-devops@0.0.11 --no-commit && forge install foundry-rs/forge-std@v1.5.3 --no-commit && forge install openzeppelin/openzeppelin-contracts --no-commit && forge install openzeppelin/openzeppelin-contracts-upgradeable --no-commit && forge install transmissions11/solmate --no-commit && npm i

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

coverage :; forge coverage --report debug > coverage-report.txt

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

ifeq ($(findstring --network goerli,$(ARGS)),--network goerli)
	NETWORK_ARGS := --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)
endif

ifeq ($(findstring --network mumbai,$(ARGS)),--network mumbai)
	NETWORK_ARGS := --rpc-url $(MUMBAI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_SCAN_API_KEY)
endif

ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)
endif

ifeq ($(findstring --network fuji,$(ARGS)),--network fuji)
	NETWORK_ARGS := --rpc-url $(FUJI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(SNOWTRACE_API_KEY)
endif

ifeq ($(findstring --network zkevmTestnet,$(ARGS)),--network zkevmTestnet)
	NETWORK_ARGS := --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_ZKEVM_SCAN_API_KEY)
endif

ifeq ($(findstring --network baseGoerli,$(ARGS)),--network baseGoerli)
	NETWORK_ARGS := --rpc-url $(BASE_GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(BASE_SCAN_API_KEY)
endif

ifeq ($(findstring --network linea,$(ARGS)),--network linea)
	NETWORK_ARGS := --rpc-url $(LINEA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(LINEA_SCAN_API_KEY)
endif

ifeq ($(findstring --network scrollSepolia,$(ARGS)),--network scrollSepolia)
	NETWORK_ARGS := --rpc-url $(SCROLL_SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(SEPOLIA_SCAN_API_KEY)
endif

ifeq ($(findstring --network xdcTestnet,$(ARGS)),--network xdcTestnet)
	NETWORK_ARGS := --rpc-url $(XDC_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
endif

ifeq ($(findstring --network celoTestnet,$(ARGS)),--network celoTestnet)
	NETWORK_ARGS := --rpc-url $(CELO_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(CELO_SCAN_API_KEY)
endif

ifeq ($(findstring --network arbGoreli,$(ARGS)),--network arbGoreli)
	NETWORK_ARGS := --rpc-url $(ARB_GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ARB_GOERLI_SCAN_API_KEY)
endif

ifeq ($(findstring --network gnosis,$(ARGS)),--network gnosis)
	NETWORK_ARGS := --rpc-url $(GNOSIS_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(GONSIS_SCAN_API_KEY)
endif

# Commands for Local

deployTestGHO:
	@forge script script/DeployTestGHO.s.sol:DeployTestGHO $(NETWORK_ARGS)

deployGHOPassport:
	@forge script script/DeployTestGHOPassport.s.sol:DeployTestGHOPassport $(NETWORK_ARGS)

deployGHOPartnerPassport:
	@forge script script/DeployTestGHOPartnerPassport.s.sol:DeployTestGHOPartnerPassport $(NETWORK_ARGS)

deployUtils:
	@forge script script/DeployUtils.s.sol:DeployUtils $(NETWORK_ARGS)	

deployRPool:
	@forge script script/DeployRPool.s.sol:DeployRPool $(NETWORK_ARGS)

deployMainVault:
	@forge script script/DeployMainVault.s.sol:DeployMainVault $(NETWORK_ARGS)

deployPartnerContractsDeployer:
	@forge script script/DeployPartnerContractsDeployer.s.sol:DeployPartnerContractsDeployer $(NETWORK_ARGS)

deployMainPayment:
	@forge script script/DeployMainPayment.s.sol:DeployMainPayment $(NETWORK_ARGS)

deployContracts:
	make deployUtils && make deployRPool && make deployMainVault && make deployMainPayment && make deployPartnerContractsDeployer 


	-----------------

mintGHOToken:
	@forge script script/Interactions.s.sol:MintGHOToken $(NETWORK_ARGS)

mintNFT:
	@forge script script/Interactions.s.sol:MintNFT $(NETWORK_ARGS)

setMainPayment:
	@forge script script/Interactions.s.sol:SetMainPayment $(NETWORK_ARGS)

setMainVault:
	@forge script script/Interactions.s.sol:SetMainVault $(NETWORK_ARGS)

depositGHOInMainVault:
	@forge script script/Interactions.s.sol:DepositGHOInMainVault $(NETWORK_ARGS)

setMainVaultFee:
	@forge script script/Interactions.s.sol:SetMainVaultFee $(NETWORK_ARGS)

setUpInteractions:
	make mintGHOToken && make setMainPayment && make setMainVault && make depositGHOInMainVault && make setMainVaultFee

	--------	

registerAsPartner:
	@forge script script/Interactions.s.sol:RegisterAsPartner $(NETWORK_ARGS)



# Commands for Testnets

deployTestGHOOnSepolia:
	make deployTestGHO ARGS="--network sepolia"

deployGHOPassportOnSepolia:
	make deployGHOPassport ARGS="--network sepolia"

deployGHOPartnerPassportOnSepolia:
	make deployGHOPartnerPassport ARGS="--network sepolia"

deployUtilsOnSepolia:
	make deployUtils ARGS="--network sepolia"

deployRPoolOnSepolia:
	make deployRPool ARGS="--network sepolia"

deployMainVaultOnSepolia:
	make deployMainVault ARGS="--network sepolia"

deployMainPaymentOnSepolia:
	make deployMainPayment ARGS="--network sepolia"

deployPartnerContractsDeployerOnSepolia:
	make deployPartnerContractsDeployer ARGS="--network sepolia"

deployContractsOnSepolia:
	make deployUtilsOnSepolia && make deployRPoolOnSepolia && make deployMainVaultOnSepolia && make deployMainPaymentOnSepolia && make deployPartnerContractsDeployerOnSepolia

	-----------------

mintGHOTokenOnSepolia:
	make mintGHOToken ARGS="--network sepolia"

mintNFTOnSepolia:
	make mintNFT ARGS="--network sepolia"

setMainPaymentOnSepolia:
	make setMainPayment ARGS="--network sepolia"

setMainVaultOnSepolia:
	make setMainVault ARGS="--network sepolia"

depositGHOInMainVaultOnSepolia:
	make depositGHOInMainVault ARGS="--network sepolia"

setMainVaultFeeOnSepolia:
	make setMainVaultFee ARGS="--network sepolia"

setUpInteractionsOnSepolia:
	make mintGHOTokenOnSepolia && make setMainPaymentOnSepolia && make setMainVaultOnSepolia && make depositGHOInMainVaultOnSepolia && make setMainVaultFeeOnSepolia

	--------

registerAsPartnerOnSepolia:
	make registerAsPartner ARGS="--network sepolia"