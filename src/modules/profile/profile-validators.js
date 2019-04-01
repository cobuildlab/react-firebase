import validate from 'validate.js';

import { IntegrityError } from '../../shared/errors';

const PROFILE_CONSTRAINTS = {
  gender: {
    presence: {
      allowEmpty: false,
      message: `Gender can't be blank`,
    },
  },
  race: {
    presence: {
      allowEmpty: false,
      message: `Race can't be blank`,
    },
  },
  age: {
    presence: {
      allowEmpty: false,
      message: `Age can't be blank`,
    },
  },
  yearsInEducation: {
    presence: {
      allowEmpty: false,
      message: `Years in Education can't be blank`,
    },
  },
  schoolLevel: {
    presence: {
      allowEmpty: false,
      message: `School Level can't be blank`,
    },
  },
  yearsInCurrentSchool: {
    presence: {
      allowEmpty: false,
      message: `Years in Current School can't be blank`,
    },
  },
  yearsWithPrincipal: {
    presence: {
      allowEmpty: false,
      message: `Years with Principal can't be blank`,
    },
  },
  howManyPrincipals: {
    presence: {
      allowEmpty: false,
      message: `How many Principals can't be blank`,
    },
  },
  howManySchools: {
    presence: {
      allowEmpty: false,
      message: `Hos Many Schools can't be blank`,
    },
  },
  certificationType: {
    presence: {
      allowEmpty: false,
      message: `Certification Type can't be blank`,
    },
  },
  consideringLivingSchool: {
    presence: {
      allowEmpty: false,
      message: `Considering Living School can't be blank`,
    },
  },
  consideringLivingProfession: {
    presence: {
      allowEmpty: false,
      message: `Considering Living Profession can't be blank`,
    },
  },
  interestedOnLeadership: {
    presence: {
      allowEmpty: false,
      message: `Interest on Leadership can't be blank`,
    },
  },
  highestDegree: {
    presence: {
      allowEmpty: false,
      message: `Highest Degree can't be blank`,
    },
  },
};

export const profileValidator = (profileData) => {
  const result = validate(profileData, PROFILE_CONSTRAINTS, { format: 'flat' });
  if (result !== undefined) throw new IntegrityError(result[0]);
};
