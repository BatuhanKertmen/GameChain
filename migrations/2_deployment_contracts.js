gameToken = artifacts.require('GameToken')
videoGames = artifacts.require('VideoGames')


module.exports = async function(deployer, accounts) {
    await deployer.deploy(gameToken)

    await deployer.deploy(videoGames)

    await gameToken.transfer(accounts[0], web3.utils.toWei('22222'))
}