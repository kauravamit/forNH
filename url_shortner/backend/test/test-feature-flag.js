'use strict';

const chai = require('chai');
const expect = chai.expect;
const featureFlag = require('../shared/feature-flag');

describe('/Check feature flag', () => {

    it('it should return false for non-existent flag', () => {
        expect(featureFlag.isEnabled('FakeFlag')).to.be.false;
    });

    it('it should return true for flag set to true', () => {
        const flagName = 'TestFlag';
        featureFlag.setFlag(flagName, true);
        expect(featureFlag.isEnabled(flagName)).to.be.true;
    });

    it('it should return false for flag set to false', () => {
        const flagName = 'TestFlag';
        featureFlag.setFlag(flagName, false);
        expect(featureFlag.isEnabled(flagName)).to.be.false;
    });

});
