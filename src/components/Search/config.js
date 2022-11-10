export const tableData = [
  {
    title: "Delivery",
    kpi: [
      "Actual delivery time vs Estimate delivery time(Task wise)",
      "Ontime successful delivery vs Total deliveries (Sprint wise)",
    ],
    remarks: ["", "sticking to deadlines delivering on time"],
    unit: ["%", "%"],
    type: ["Negative", "Negative"],
    target: [100, 100],
    weightage: [20, 25],
    marks: [],
  },

  {
    title: "Quality",
    kpi: [
      "Avg code review score",
      "redo works count(Relaxation upto 2)",
      "Total bugs reported by client on DEV",
    ],
    remarks: [
      "write test cases",
      " can not do silly mistakes",
      "zero bugs on production",
    ],
    unit: ["%", "%", "%"],
    type: ["positive", "negative", "negative"],
    target: [100, 100, 100],
    weightage: [10, 10, 10],
    marks: [],
  },
  {
    title: "Productity",
    kpi: [
      "Number of critical issues resolved",
      "customer satisfaction Rating>4.5",
    ],
    remarks: ["", ""],
    unit: ["%", "%"],
    type: ["positive", "positive"],
    target: [100, 100],
    weightage: [5, 10],
    marks: [],
  },

  {
    title: "Mandatory clause",
    kpi: ["upskilling of individual Learning "],
    remarks: ["Learn one new thing"],
    unit: ["%"],
    type: ["positive"],
    target: [100],
    weightage: [10],
    marks: [0],
  },
];

export const BACKEND_URL = "https://api-qservices-tasks.azurewebsites.net";
