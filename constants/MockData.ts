export const Piedata = [
  {
    name: "Seoul",
    population: 21500,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Toronto",
    population: 28000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Beijing",
    population: 5276,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "New York",
    population: 85380,
    color: "#3eb26e",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
  {
    name: "Moscow",
    population: 11920,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  },
];
export const data = [
    {
      id: 3,
      expenseName: "Industrial Machinery/Components",
      expenseAmount: 7306,
      type: "miscellaneous",
    },
    {
      id: 4,
      expenseName: "Major Pharmaceuticals",
      expenseAmount: 9325,
      type: "travel",
    },
    {
      id: 5,
      expenseName:
        "Biotechnology: Biological Products (No Diagnostic Substances)",
      expenseAmount: 5558,
      type: "food",
    },
    {
      id: 6,
      expenseName: "Computer Communications Equipment",
      expenseAmount: 3501,
      type: "movies",
    },
    {
      id: 7,
      expenseName: "Real Estate",
      expenseAmount: 3751,
      type: "miscellaneous",
    },
    {
      id: 8,
      expenseName: "Marine Transportation",
      expenseAmount: 4494,
      type: "travel",
    },
    {
      id: 9,
      expenseName: "Major Banks",
      expenseAmount: 797,
      type: "grocery",
    },
    {
      id: 10,
      expenseName: "Commercial Banks",
      expenseAmount: 6260,
      type: "food",
    },
  ];
const labelStyle={
  fontSize:12
}
export const radioButtons = [
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Food",
      value: "food",
      labelStyle:labelStyle
    },
    {
      id: "2",
      label: "Travel",
      value: "travel",
      labelStyle:labelStyle
    },
    {
      id: "3",
      label: "Other",
      value: "other",
      labelStyle:labelStyle
    },
  ];