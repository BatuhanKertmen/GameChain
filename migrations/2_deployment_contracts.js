gameToken = artifacts.require('GameToken')
videoGames = artifacts.require('VideoGames')


module.exports = async function(deployer) {
    await deployer.deploy(gameToken)

    await deployer.deploy(videoGames)
}