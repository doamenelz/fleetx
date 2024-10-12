import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { Kin } from "@/modules/MyBio/models/Kin";
import { faker } from "@faker-js/faker";
faker.seed(123);
export const generateEmployeeList = (count: number) => {
  var _employeeList: Employee[] = [];
  for (let index = 0; index < count; index++) {
    _employeeList.push(
      generateRandomEmployee(
        genEmpName("male"),
        "male",
        teams[Math.floor(Math.random() * (2 - 0)) + 1]
      )
    );
  }

  return _employeeList;
};

export const genEmpName = (sex: "male" | "female") => {
  let firstName = faker.person.firstName(sex);
  let lastName = faker.person.lastName();
  let otherName = faker.person.middleName(sex);
  return {
    firstName: firstName,
    lastName: lastName,
    otherName: otherName,
    fullName: `${firstName} ${otherName} ${lastName}`,
  };
};

export const generateRandomEmployee = (
  name: _AliasName,
  sex: "male" | "female",
  teamId: string
) => {
  let employee: Employee = {
    id: faker.string.alphanumeric({ length: 5, casing: "upper" }),
    bioData: {
      firstName: name.firstName,
      lastName: name.lastName,
      fullName: name.fullName,
      title: sex === "male" ? "Mr" : "Miss",
      gender: sex,
      dateOfBirth: formatDate(
        new Date(faker.date.birthdate({ min: 18, max: 65, mode: "age" })),
        DATE_OPTIONS.dMY
      ),
      otherNames: name.otherName,
      maidenName: "Sloane",
      placeOfBirth: faker.location.country(),
      maritalStatus: "Married",
      religion: "Atheist",
      marriageDate: new Date(
        faker.date.past({ years: 5, refDate: new Date().toDateString() })
      ).toString(),
      avatar: faker.image.avatar(),
    },
    jobInformation: {
      jobTitle: faker.person.jobTitle(),
      teamId: teamId,
      location: faker.location.country(),
    },
    contactDetails: {
      phoneNumber: faker.phone.number(),
      emailAddress: faker.internet.email(),
    },
  };

  return employee;
};
export interface Employee {
  id: string;
  bioData: {
    title?: string;
    firstName: string;
    lastName: string;
    fullName: string;
    otherNames?: string;
    maidenName?: string;
    gender?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    maritalStatus?: string;
    religion?: string;
    marriageDate?: string;
    avatar: string;
  };
  contactDetails?: {
    officialEmail?: string;
    officeExtension?: string;
    emailAddress?: string;
    phoneNumber?: string;
    residentialAddress?: Address;
    permanentAddress?: Address;
    homeTownAddress?: Address;
    nationality?: string;
    stateOfOrigin?: string;
    lga?: string;
  };
  otherInformation?: {
    passport?: {
      number: string;
      issueDate: string;
      issuedBy: string;
      expiryDate: string;
    };
    interests?: string;
    hobbies?: string;
  };
  kinAndBeneficiaries?: Kin[];
  medicalInformation?: {
    height?: string;
    weight?: string;
    genoType?: string;
    bloodType?: string;
    disability?: string;
  };
  hireInformation?: {
    hireDate?: string;
    resumptionDate?: string;
    isConfirmed?: boolean;
  };
  jobInformation?: {
    grade?: string;
    teamName?: string;
    teamId?: string;
    jobTitle: string;
    location?: string;
  };
  education?: School[];
  educationInformation?: {};
  lineManager?: Employee;
  leavePlan?: {
    id: string;
    resumptionDate?: Date;
    leaveStart?: Date;
    status: string;
  }[];
  reports?: Employee[];
  workExperience?: {
    summary: string;
    history: WorkExperience[];
  };
  training?: Training[];
  projects?: Project[];
  skills?: Skill[];
  awards?: Award[];
  languages?: Languages[];
}

interface Skill {
  id: string;
  name: string;
  proficiencyLevel: string;
  yearsOfExperience: string;
}

interface Languages {
  id: string;
  name: string;
  reading: string;
  writing: string;
  speaking: string;
  listening: string;
}

interface Award {
  id: string;
  name: string;
  awardedBy: string;
  dateAwarded: string;
}
interface Project {
  id: string;
  name: string;
  role: string;
  contribution?: string;
  referenceDate?: string;
}
export interface Address {
  city: string;
  state: string;
  streetAddress: string;
  phone?: string;
}

interface Training {
  id: string;
  title: string;
  category?: string;
  institution?: string;
  deliveryMode?: string;
  skills?: string;
  dateCompleted: string;
}
interface WorkExperience {
  id: string;
  companyName: string;
  industry?: string;
  address?: string;
  startDate: string;
  exitDate?: string;
  reasonForExit?: string;
  location: string;
}
interface School {
  id: string;
  name: string;
  course?: string;
  qualification?: string;
  grade?: string;
  studentNumber?: string;
  awardedBy?: string;
  level?: string;
  entryYear: string;
  graduationYear: string;
  type: "preTertiary" | "postSecondary" | "professionalQualifications";
}

export const sampleEmployee: Employee = {
  id: "13445",
  bioData: {
    firstName: "Stephanie",
    lastName: "Wilcox",
    fullName: "Stephanie Maya Wilcox",
    title: "Miss",
    gender: "Female",
    dateOfBirth: "1989-11-06T04:46:59Z",
    otherNames: "Maya",
    maidenName: "Sloane",
    placeOfBirth: "Nigeria",
    maritalStatus: "Married",
    religion: "Atheism",
    marriageDate: "23 Aug, 2023",
    avatar: "/avatar.jpg", //xmSWVeGEnJw / 3TLl_97HNJo
  },
  contactDetails: {
    officialEmail: "v.wilcox@quetzalconsults.com",
    officeExtension: "245",
    emailAddress: "v_wilcox@yahoo.com",
    phoneNumber: "08034321223",
    residentialAddress: {
      city: "Victoria Island",
      state: "Lagos",
      streetAddress: "19 Richard Jameson Street",
      phone: "",
    },
    permanentAddress: {
      city: "Victoria Island",
      state: "Lagos",
      streetAddress: "19 Richard Jameson Street",
      phone: "",
    },
    homeTownAddress: {
      city: "Victoria Island",
      state: "Lagos",
      streetAddress: "284 Crown Estate Road",
      phone: "",
    },
    nationality: "Nigeria",
    stateOfOrigin: "Rivers",
    lga: "Maryland",
  },
  lineManager: generateRandomEmployee(
    genEmpName("female"),
    "female",
    "Architecture"
  ),
  jobInformation: {
    grade: "Senior Banking Officer",
    teamName: "IT Architecture & Strategy",
    teamId: "it-as",
    jobTitle: "Team Lead, IT Architecture & Strategy",
    location: "Lagos",
  },
  otherInformation: {
    passport: {
      number: "AO154839UI",
      issueDate: "23/12/23",
      issuedBy: "Lagos",
      expiryDate: "23/23/26",
    },
    interests: "Soccer, Basketball, Football, Reading",
    hobbies: "Talking Walks",
  },
  medicalInformation: {
    height: "5'5",
    weight: "60kg",
    genoType: "AA",
    bloodType: "O+",
    disability: "None",
  },
  hireInformation: {
    hireDate: "23 Aug, 2019",
    resumptionDate: "23 Aug, 2019",
    isConfirmed: true,
  },
  education: [
    {
      id: "01",
      name: "Primary",
      course: "",
      qualification: "First School Leaving Certificate",
      grade: "",
      studentNumber: "",
      awardedBy: "Queens College",
      level: "",
      entryYear: "1999",
      graduationYear: "2005",
      type: "preTertiary",
    },
    {
      id: "02",
      name: "string",
      course: "string",
      qualification: "string",
      grade: "string",
      studentNumber: "string",
      awardedBy: "string",
      level: "string",
      entryYear: "string",
      graduationYear: "string",
      type: "postSecondary",
    },
    {
      id: "03",
      name: "string",
      course: "string",
      qualification: "string",
      grade: "string",
      studentNumber: "string",
      awardedBy: "string",
      level: "string",
      entryYear: "string",
      graduationYear: "string",
      type: "professionalQualifications",
    },
  ],
  educationInformation: {},
};

interface _AliasName {
  firstName: string;
  lastName: string;
  otherName: string;
  fullName: string;
}

const teams: string[] = ["IT", "Architecture", "Genesis"];

export const sampleEmployeeList: Employee[] = [
  generateRandomEmployee(genEmpName("male"), "male", "Architecture"),
  generateRandomEmployee(genEmpName("female"), "female", "Architecture"),
  generateRandomEmployee(genEmpName("female"), "female", ""),
  generateRandomEmployee(genEmpName("female"), "female", "Architecture"),
  generateRandomEmployee(genEmpName("male"), "male", ""),
  generateRandomEmployee(genEmpName("male"), "male", "Architecture"),
  generateRandomEmployee(genEmpName("female"), "female", "Architecture"),
  generateRandomEmployee(genEmpName("female"), "female", ""),
  generateRandomEmployee(genEmpName("female"), "female", "Architecture"),
  generateRandomEmployee(genEmpName("male"), "male", ""),
];
