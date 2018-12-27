const CertificateCreator = artifacts.require("./CertificateCreator.sol");

contract('Contract', (accounts) => {
  it('can create a certificate', async () => {
    const certCreator = await CertificateCreator.deployed()
    certCreator.createCertificate(23, 'heja cos', 25)
    const value = await certCreator.howManyCert()
    assert.equal(value, 1)
  })

//   it('can create a certificate', async () => {
//     const certCreator = await CertificateCreator.deployed()
//     certCreator.createCertificate(23, 'heja cos', 25)
//     const value = await certCreator.howManyCert()
//     assert.equal(value, 1)
//   })
})
