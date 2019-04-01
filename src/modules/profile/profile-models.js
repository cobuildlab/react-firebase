export const QUESTIONS = [
  {
    options: [
      {
        title: 'Gender',
        id: 'gender',
        values: [{ name: 'Female', checked: false }, { name: 'Male', checked: false }],
      },
      {
        title: 'Race',
        id: 'race',
        values: [
          { name: 'White', checked: false },
          { name: 'African-American', checked: false },
          { name: 'Asian', checked: false },
          { name: 'American indian/Alaska Native', checked: false },
          { name: 'Other..', checked: false },
        ],
      },
      {
        title: 'Age',
        id: 'age',
        values: [
          { name: 'Under 30', checked: false },
          { name: '31 to 39', checked: false },
          { name: '40 to 49', checked: false },
          { name: '50 or higher', checked: false },
        ],
      },
      {
        title: 'Number of years in education',
        id: 'yearsInEducation',
        values: [
          { name: '0 to 5', checked: false },
          { name: '6 to 10', checked: false },
          { name: '11 to 15', checked: false },
          { name: '16 or higher', checked: false },
        ],
      },
      {
        title: 'School Level',
        id: 'schoolLevel',
        values: [
          { name: 'Elementary school', checked: false },
          { name: 'Middle school', checked: false },
          { name: 'high school', checked: false },
        ],
      },
    ],
  },
  {
    options: [
      {
        title: 'Number of years in current School',
        id: 'yearsInCurrentSchool',
        values: [
          { name: '0 to 5', checked: false },
          { name: '6 to 10', checked: false },
          { name: '11 to 15', checked: false },
          { name: '16 or higher', checked: false },
        ],
      },
      {
        title: 'Number of years I have worked with the principal in this school.',
        id: 'yearsWithPrincipal',
        values: [
          { name: '0 to 2', checked: false },
          { name: '3 to 4', checked: false },
          { name: '5 to 6', checked: false },
          { name: '7 or more', checked: false },
        ],
      },
      {
        title: 'In your tenure in this building, how many principals have you worked with',
        id: 'howManyPrincipals',
        values: [
          { name: '1 to 2', checked: false },
          { name: '3 to 4', checked: false },
          { name: '5 or more', checked: false },
        ],
      },
      {
        title: 'How many schools have you worked in during your career',
        id: 'howManySchools',
        values: [
          { name: '1 to 2', checked: false },
          { name: '3', checked: false },
          { name: '4 or more', checked: false },
        ],
      },
    ],
  },
  {
    options: [
      {
        title: 'Certification Type:',
        id: 'certificationType',
        values: [
          { name: 'Traditional certification', checked: false },
          { name: 'Alternative Certification', checked: false },
        ],
      },
      {
        title: 'Are you considering leaving your current school?',
        id: 'consideringLivingSchool',
        values: [{ name: 'Yes', checked: false }, { name: 'No', checked: false }],
      },
      {
        title:
          'Are you considering leaving the teaching profession for reasons other than retirement?',
        id: 'consideringLivingProfession',
        dropdown: false,
        values: [{ name: 'Yes', checked: false }, { name: 'No', checked: false }],
      },
      {
        title:
          'Do you have an interest in a leadership-type position? [e.g., a/principal, principal, instructional coach, dept chair; lead teacher; etc.]',
        id: 'interestedOnLeadership',
        dropdown: false,
        values: [{ name: 'Yes', checked: false }, { name: 'No', checked: false }],
      },
      {
        title: 'Highest Degree Attained:',
        id: 'highestDegree',
        values: [
          { name: 'Bachelor’s Degree', checked: false },
          { name: 'Master’s Degree', checked: false },
          { name: 'Specialist in Education Degree', checked: false },
          { name: 'Doctoral Degree', checked: false },
        ],
      },
    ],
  },
];

export const ProfileModel = {
  gender: null,
  race: null,
  age: null,
  yearsInEducation: null,
  schoolLevel: null,
  yearsInCurrentSchool: null,
  yearsWithPrincipal: null,
  howManyPrincipals: null,
  howManySchools: null,
  certificationType: null,
  consideringLivingSchool: null,
  consideringLivingProfession: null,
  interestedOnLeadership: null,
  highestDegree: null,
};
