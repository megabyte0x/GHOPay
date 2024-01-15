//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC4626} from "@solmate/contracts/mixins/ERC4626.sol";
import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeTransferLib} from "@solmate/contracts/utils/SafeTransferLib.sol";

contract PartnerVault is ERC4626, Ownable {
    using SafeTransferLib for ERC20;

    address public s_rewardPool;
    uint8 public s_withdrawalFee;

    ERC20 public immutable i_ghoToken;

    constructor(ERC20 _ghoToken, string memory _name, string memory _symbol, address _partnerAddress, uint8 ratio)
        ERC4626(_ghoToken, _name, _symbol, (_ghoToken.decimals() + ratio))
    {
        i_ghoToken = _ghoToken;

        transferOwnership(_partnerAddress);
    }

    function setWithdrawalFee(uint8 _withdrawalFee) public onlyOwner {
        s_withdrawalFee = _withdrawalFee;
    }

    function setRewardPool(address _rewardPool) public onlyOwner {
        s_rewardPool = _rewardPool;
    }

    function depositGHO(uint256 amountOfGHO) public onlyOwner {
        deposit(amountOfGHO, s_rewardPool);
    }

    function withdrawGHO(uint256 _rp, address _receiver, address _owner) public {
        withdraw(_rp, _receiver, _owner);
    }

    function totalAssets() public view override returns (uint256) {
        return i_ghoToken.balanceOf(address(this));
    }

    function rpTokenBalance(address _user) public view returns (uint256) {
        return balanceOf[_user];
    }

    function withdraw(uint256 assets, address receiver, address _owner)
        public
        virtual
        override
        returns (uint256 shares)
    {
        shares = previewWithdraw(assets); // No need to check for rounding error, previewWithdraw rounds up.

        if (msg.sender != _owner) {
            uint256 allowed = allowance[_owner][msg.sender]; // Saves gas for limited approvals.

            if (allowed != type(uint256).max) allowance[_owner][msg.sender] = allowed - shares;
        }

        beforeWithdraw(assets, shares);

        _burn(_owner, shares);

        emit Withdraw(msg.sender, receiver, _owner, assets, shares);

        if (msg.sender == owner()) {
            i_ghoToken.safeTransfer(receiver, assets);
        } else {
            (uint256 amountPayable, uint256 feeForRPool) = withdrawWithFee(assets);
            i_ghoToken.safeTransfer(receiver, amountPayable);
            i_ghoToken.safeTransfer(s_rewardPool, feeForRPool);
        }
    }

    function withdrawWithFee(uint256 _rpTokenAmount)
        internal
        view
        returns (uint256 amountPayable, uint256 feeForRPool)
    {
        uint256 fee = calculateFee(_rpTokenAmount);
        feeForRPool = (fee * 50) / 100;
        amountPayable = _rpTokenAmount - fee;
    }

    function calculateFee(uint256 _rpTokenAmount) internal view returns (uint256) {
        return (_rpTokenAmount * s_withdrawalFee) / 100;
    }
}
