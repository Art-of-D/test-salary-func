function calculateTeamFinanceReport(salaries, team) {
  const CONSTANTS = {
    SALARIES_MIN: 1,
    SALARIES_MAX: 10,
    TEAM_MIN: 1,
    TEAM_MAX: 100,
    MIN_TAX: 0,
    MAX_TAX: 100,
    MIN_SALARY: 100,
    MAX_SALARY: 100000,
  };
  let totalBudget = 0;
  const totalBudgetBySpecialization = {};
  const financeReport = { totalBudget, ...totalBudgetBySpecialization };
  if (
    !salaries ||
    salaries.length < CONSTANTS.SALARIES_MIN ||
    salaries.length > CONSTANTS.SALARIES_MAX
  ) {
    console.log(
      `Minimum specializations amount is ${CONSTANTS.SALARIES_MIN}, maximum up to ${CONSTANTS.SALARIES_MAX}`
    );
    return financeReport;
  }

  if (
    !team ||
    team.length < CONSTANTS.TEAM_MIN ||
    team.length > CONSTANTS.TEAM_MAX
  ) {
    console.log(
      `Minimum members amount is ${CONSTANTS.TEAM_MIN}, maximum up to ${CONSTANTS.TEAM_MAX}`
    );
    return financeReport;
  }

  for (const salary in salaries) {
    const specSalary = salaries[salary].salary;
    const tax = Number.parseInt(salaries[salary].tax);
    if (
      !specSalary ||
      specSalary < CONSTANTS.MIN_SALARY ||
      specSalary > CONSTANTS.MAX_SALARY
    ) {
      console.log(
        `Minimum salary is ${CONSTANTS.MIN_SALARY}, maximum up to ${CONSTANTS.MAX_SALARY}`
      );
      return financeReport;
    }
    if (!tax || tax < CONSTANTS.MIN_TAX || tax > CONSTANTS.MAX_TAX) {
      console.log(
        `Minimum tax is ${CONSTANTS.MIN_TAX}, maximum up to ${CONSTANTS.MAX_TAX}`
      );
      return financeReport;
    }
    const amountMembers = team.filter(
      (member) => member.specialization === `${salary}`
    );

    totalBudgetBySpecialization[`totalBudget${salary}`] = Math.trunc(
      amountMembers.length * specSalary
    );
    totalBudget += totalBudgetBySpecialization[`totalBudget${salary}`];
  }
  return { totalBudget, ...totalBudgetBySpecialization };
}

const salaries1 = {
  Manager: { salary: 1000, tax: "-10%" },
  Designer: { salary: 600, tax: "30%" },
  Artist: { salary: 1500, tax: "15%" },
};
const team1 = [
  { name: "Misha", specialization: "Manager" },
  { name: "Max", specialization: "Designer" },
  { name: "Vova", specialization: "Designer" },
  { name: "Leo", specialization: "Artist" },
];
const financeReport1 = calculateTeamFinanceReport(salaries1, team1);
console.log(JSON.stringify(financeReport1));
