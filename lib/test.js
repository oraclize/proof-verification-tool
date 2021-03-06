'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runTest = undefined;

var _index = require('./index.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
/* eslint-disable no-console */

const fs = require('fs');

const testGetProofType = () => {
  const proofType_TLSNotary = (0, _index.getProofType)('tlsnotary notarization file\n  /X]H_<Õ¥ïê');
  const proofType_Android = (0, _index.getProofType)('AP¿lHTTPResponseY"{"error":[],"result":{');
  // $FlowFixMe
  console.log(`index.js/getProofType:  ${proofType_TLSNotary === 'proofType_TLSNotary' && proofType_Android === 'proofType_Android'}`); // eslint-disable-line no-console
};

// we have to use literal path so browserify can put the file's content in the bundle
const proofs = [fs.readFileSync('./proof/androidV2.proof'), fs.readFileSync('./proof/androidV2Newest.proof'), fs.readFileSync('./proof/computation.proof'), fs.readFileSync('./proof/ledger.proof'), fs.readFileSync('./proof/tlsn1.proof'), fs.readFileSync('./proof/tlsn2.proof'), fs.readFileSync('./proof/tlsn3.proof')];

const paths = ['./proof/androidV2.proof', './proof/androidV2Newest.proof', './proof/computation.proof', './proof/ledger.proof', './proof/tlsn1.proof', './proof/tlsn2.proof', './proof/tlsn3.proof'];

const autoVerify = (() => {
  var _ref = _asyncToGenerator(function* () {
    for (let h = 0; h < proofs.length; h++) {
      const parsedProof = new Uint8Array(proofs[h]);
      console.log('\x1b[32m', 'Proof file: ', paths[h], '\x1b[37m');
      try {
        const verifiedProof = yield (0, _index.verifyProof)(parsedProof);
        console.log('\x1b[33m', 'Main proof: ', '\x1b[37m', '\n ', verifiedProof.mainProof);
        console.log('\x1b[33m', 'Extension proof: ', '\x1b[37m', '\n ', verifiedProof.extensionProof);
      } catch (e) {
        console.log('Error: ', e);
      }
    }
  });

  return function autoVerify() {
    return _ref.apply(this, arguments);
  };
})();

const runTest = exports.runTest = (() => {
  testGetProofType();
  // eslint-disable-next-line no-console
  autoVerify().then(() => console.log('finish')).catch(e => console.log(e));
})();