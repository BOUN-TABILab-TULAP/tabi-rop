const doc1 = {
  text: "ROOT bu örnek bir cümledir cüm ledir .",
  entities: [
    ["T1", "ROOT", [[0, 4]]],
    ["T2", "Demons", [[5, 7]]],
    ["T3", "Noun", [[8, 13]]],
    ["T4", "ANum", [[14, 17]]],
    ["T5", "_", [[18, 26]]],
    ["T6", "Noun", [[27, 30]]],
    ["T7", "Zero", [[31, 36]]],
    ["T8", "Punc", [[37, 38]]],
  ],
  relations: [
    [
      "R1",
      "det",
      [
        ["Arg1", "T3"],
        ["Arg2", "T2"],
      ],
    ],
    [
      "R2",
      "nsubj",
      [
        ["Arg1", "T6"],
        ["Arg2", "T3"],
      ],
    ],
    [
      "R3",
      "det",
      [
        ["Arg1", "T6"],
        ["Arg2", "T4"],
      ],
    ],
    [
      "R4",
      "root",
      [
        ["Arg1", "T1"],
        ["Arg2", "T6"],
      ],
    ],
    [
      "R5",
      "cop",
      [
        ["Arg1", "T6"],
        ["Arg2", "T7"],
      ],
    ],
    [
      "R6",
      "punct",
      [
        ["Arg1", "T6"],
        ["Arg2", "T8"],
      ],
    ],
  ],
};

const coll1 = {};

const doc2 = {
  text: "Ed O'Kelley was the man who shot the man who shot Jesse James.",
  entities: [
    ["T1", "Person", [[0, 11]]],
    ["T2", "Person", [[20, 23]]],
    ["T3", "Person", [[37, 40]]],
    ["T4", "Person", [[50, 61]]],
  ],
  attributes: [["A1", "Notorious", "T4"]],
  relations: [
    [
      "R1",
      "Anaphora",
      [
        ["Anaphor", "T2"],
        ["Entity", "T1"],
      ],
    ],
  ],
  triggers: [
    ["T5", "Assassination", [[45, 49]]],
    ["T6", "Assassination", [[28, 32]]],
  ],
  events: [
    [
      "E1",
      "T5",
      [
        ["Perpetrator", "T3"],
        ["Victim", "T4"],
      ],
    ],
    [
      "E2",
      "T6",
      [
        ["Perpetrator", "T2"],
        ["Victim", "T3"],
      ],
    ],
  ],
};

const coll2 = {
  entity_types: [
    {
      type: "Person",
      labels: ["Person", "Per"],
      bgColor: "#7fa2ff",
      borderColor: "darken",
    },
  ],
  entity_attribute_types: [
    {
      type: "Notorious",
      values: {
        Notorious: { glyph: "★" },
      },
      bool: "Notorious",
    },
  ],
  relation_types: [
    {
      type: "Anaphora",
      labels: ["Anaphora", "Ana"],
      dashArray: "3,3",
      color: "purple",
      args: [
        {
          role: "Anaphor",
          targets: ["Person"],
        },
        {
          role: "Entity",
          targets: ["Person"],
        },
      ],
    },
  ],
  event_types: [
    {
      type: "Assassination",
      labels: ["Assassination", "Assas"],
      bgColor: "lightgreen",
      borderColor: "darken",
      arcs: [
        {
          type: "Victim",
          labels: ["Victim", "Vict"],
        },
        {
          type: "Perpetrator",
          labels: ["Perpetrator", "Perp"],
          color: "green",
        },
      ],
    },
  ],
};

export const docs = [doc1, doc2];
export const colls = [coll1, coll2];