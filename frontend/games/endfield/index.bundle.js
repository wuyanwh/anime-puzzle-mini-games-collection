(function initEndfieldBundle() {
  const PIECE_SHAPES = {
  "L": [
    [
      1,
      0
    ],
    [
      1,
      0
    ],
    [
      1,
      1
    ]
  ],
  "T": [
    [
      1,
      1,
      1
    ],
    [
      0,
      1,
      0
    ]
  ],
  "I": [
    [
      1,
      1,
      1
    ]
  ],
  "O": [
    [
      1,
      1
    ],
    [
      1,
      1
    ]
  ],
  "S": [
    [
      0,
      1,
      1
    ],
    [
      1,
      1,
      0
    ]
  ],
  "Z": [
    [
      1,
      1,
      0
    ],
    [
      0,
      1,
      1
    ]
  ],
  "J": [
    [
      0,
      1
    ],
    [
      0,
      1
    ],
    [
      1,
      1
    ]
  ],
  "D": [
    [
      1,
      1
    ],
    [
      1,
      0
    ]
  ],
  "V": [
    [
      1,
      1,
      1
    ],
    [
      1,
      0,
      0
    ],
    [
      1,
      0,
      0
    ]
  ],
  "Q": [
    [
      0,
      1,
      0
    ],
    [
      1,
      1,
      1
    ],
    [
      0,
      1,
      0
    ]
  ],
  "W": [
    [
      1,
      1,
      0
    ],
    [
      0,
      1,
      1
    ],
    [
      0,
      0,
      1
    ]
  ],
  "P": [
    [
      0,
      1,
      1
    ],
    [
      0,
      1,
      1
    ],
    [
      1,
      1,
      0
    ]
  ],
  "U": [
    [
      1,
      0,
      1
    ],
    [
      1,
      1,
      1
    ]
  ]
};

  const PIECE_COLORS = {
    default: "green",
    green: { skin: "green", label: "\u7ec8\u672b\u5730\u8367\u5149\u7eff" },
    blue: { skin: "blue", label: "\u79d1\u6280\u84dd" },
    yellow: { skin: "yellow", label: "\u4fe1\u6807\u9ec4" },
    red: { skin: "red", label: "\u8b66\u6212\u7ea2" }
  };

  const ENDFIELD_LEVELS = [
  {
    "id": 1,
    "name": "\u65b0\u624b\u5173\u5361",
    "size": 3,
    "rows": [
      3,
      2,
      1
    ],
    "cols": [
      3,
      2,
      1
    ],
    "blocks": [
      "I",
      "D"
    ],
    "obstacles": [],
    "answer": {
      "levelId": 1,
      "placements": [
        {
          "pieceId": "I1",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "D2",
          "origin": {
            "row": 1,
            "col": 0
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              1,
              0
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 2,
    "name": "\u54c7!\u8fd8\u6709\u5f02\u8272!",
    "size": 4,
    "rows": {
      "green": [
        2,
        3,
        1,
        2
      ],
      "blue": [
        1,
        1,
        1,
        2
      ]
    },
    "cols": {
      "green": [
        3,
        2,
        2,
        1
      ],
      "blue": [
        1,
        0,
        1,
        3
      ]
    },
    "blocks": [
      {
        "shape": "L",
        "color": "green"
      },
      {
        "shape": "J",
        "color": "blue"
      },
      {
        "shape": "S",
        "color": "green"
      }
    ],
    "fixedBlocks": [
      {
        "row": 0,
        "col": 0,
        "color": "blue"
      }
    ],
    "obstacles": [],
    "answer": {
      "levelId": 2,
      "placements": [
        {
          "pieceId": "L1",
          "origin": {
            "row": 1,
            "col": 0
          },
          "matrix": [
            [
              1,
              0
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "J2",
          "origin": {
            "row": 1,
            "col": 2
          },
          "matrix": [
            [
              0,
              1
            ],
            [
              0,
              1
            ],
            [
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "S3",
          "origin": {
            "row": 0,
            "col": 1
          },
          "matrix": [
            [
              0,
              1,
              1
            ],
            [
              1,
              1,
              0
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 3,
    "name": "\u8fc7\u7684\u4e86\u6211,\u518d\u8c08\u672a\u6765",
    "size": 5,
    "rows": [
      4,
      2,
      4,
      4,
      2
    ],
    "cols": [
      2,
      4,
      2,
      5,
      3
    ],
    "blocks": [
      "T",
      "L",
      "Z",
      "O"
    ],
    "obstacles": [
      [
        0,
        4
      ],
      [
        4,
        0
      ]
    ],
    "answer": {
      "levelId": 3,
      "placements": [
        {
          "pieceId": "T1",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              1
            ],
            [
              0,
              1,
              0
            ]
          ]
        },
        {
          "pieceId": "L2",
          "origin": {
            "row": 0,
            "col": 3
          },
          "matrix": [
            [
              1,
              0
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "Z3",
          "origin": {
            "row": 2,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              0
            ],
            [
              0,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "O4",
          "origin": {
            "row": 3,
            "col": 3
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              1,
              1
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 4,
    "name": "\u4e00\u4e2a\u5708",
    "size": 5,
    "rows": [
      5,
      2,
      2,
      2,
      5
    ],
    "cols": [
      5,
      2,
      2,
      2,
      5
    ],
    "blocks": [
      "L",
      "L",
      "L",
      "L"
    ],
    "obstacles": [
      [
        2,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        2
      ]
    ],
    "answer": {
      "levelId": 4,
      "placements": [
        {
          "pieceId": "L1",
          "origin": {
            "row": 2,
            "col": 0
          },
          "matrix": [
            [
              1,
              0
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "L2",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              1
            ],
            [
              1,
              0,
              0
            ]
          ]
        },
        {
          "pieceId": "L3",
          "origin": {
            "row": 0,
            "col": 3
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              0,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "L4",
          "origin": {
            "row": 3,
            "col": 2
          },
          "matrix": [
            [
              0,
              0,
              1
            ],
            [
              1,
              1,
              1
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 5,
    "name": "\u53c8\u4e00\u4e2a\u5708",
    "size": 5,
    "rows": [
      5,
      2,
      2,
      2,
      5
    ],
    "cols": [
      5,
      2,
      2,
      2,
      5
    ],
    "blocks": [
      "L",
      "L",
      "D",
      "V"
    ],
    "obstacles": [],
    "answer": {
      "levelId": 5,
      "placements": [
        {
          "pieceId": "L1",
          "origin": {
            "row": 0,
            "col": 3
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              0,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "L2",
          "origin": {
            "row": 3,
            "col": 2
          },
          "matrix": [
            [
              0,
              0,
              1
            ],
            [
              1,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "D3",
          "origin": {
            "row": 3,
            "col": 0
          },
          "matrix": [
            [
              1,
              0
            ],
            [
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "V4",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              1
            ],
            [
              1,
              0,
              0
            ],
            [
              1,
              0,
              0
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 6,
    "name": "\u8fd8\u662f\u5708?",
    "size": 5,
    "rows": [
      5,
      3,
      2,
      3,
      5
    ],
    "cols": [
      5,
      3,
      2,
      3,
      5
    ],
    "blocks": [
      "V",
      "V",
      "O",
      "O"
    ],
    "obstacles": [],
    "answer": {
      "levelId": 6,
      "placements": [
        {
          "pieceId": "V1",
          "origin": {
            "row": 0,
            "col": 2
          },
          "matrix": [
            [
              1,
              1,
              1
            ],
            [
              0,
              0,
              1
            ],
            [
              0,
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "V2",
          "origin": {
            "row": 2,
            "col": 0
          },
          "matrix": [
            [
              1,
              0,
              0
            ],
            [
              1,
              0,
              0
            ],
            [
              1,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "O3",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "O4",
          "origin": {
            "row": 3,
            "col": 3
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              1,
              1
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 7,
    "name": "\u7bad\u5934",
    "size": 5,
    "rows": [
      4,
      5,
      3,
      2,
      1
    ],
    "cols": [
      4,
      5,
      3,
      2,
      1
    ],
    "blocks": [
      "S",
      "Z",
      "Q"
    ],
    "obstacles": [
      [
        3,
        3
      ],
      [
        4,
        4
      ]
    ],
    "fixedBlocks": [
      [
        0,
        0
      ],
      [
        2,
        2
      ]
    ],
    "answer": {
      "levelId": 7,
      "placements": [
        {
          "pieceId": "S1",
          "origin": {
            "row": 2,
            "col": 0
          },
          "matrix": [
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "Z2",
          "origin": {
            "row": 0,
            "col": 2
          },
          "matrix": [
            [
              1,
              1,
              0
            ],
            [
              0,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "Q3",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              0,
              1,
              0
            ],
            [
              1,
              1,
              1
            ],
            [
              0,
              1,
              0
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 8,
    "name": "\u5927\u7bad\u5934",
    "size": 5,
    "rows": [
      4,
      5,
      3,
      2,
      1
    ],
    "cols": [
      4,
      5,
      3,
      2,
      1
    ],
    "blocks": [
      "L",
      "L",
      "L"
    ],
    "obstacles": [
      [
        3,
        3
      ],
      [
        4,
        4
      ]
    ],
    "fixedBlocks": [
      [
        3,
        0
      ],
      [
        0,
        3
      ],
      [
        1,
        1
      ]
    ],
    "answer": {
      "levelId": 8,
      "placements": [
        {
          "pieceId": "L1",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              1
            ],
            [
              1,
              0,
              0
            ]
          ]
        },
        {
          "pieceId": "L2",
          "origin": {
            "row": 1,
            "col": 2
          },
          "matrix": [
            [
              1,
              1,
              1
            ],
            [
              1,
              0,
              0
            ]
          ]
        },
        {
          "pieceId": "L3",
          "origin": {
            "row": 2,
            "col": 0
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              0,
              1
            ],
            [
              0,
              1
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 9,
    "name": "\u5176\u5b9e\u6211\u89c9\u5f97\u50cf\u9550\u5b50",
    "size": 5,
    "rows": [
      4,
      5,
      3,
      2,
      1
    ],
    "cols": [
      4,
      5,
      3,
      2,
      1
    ],
    "blocks": [
      "L",
      "D",
      "T",
      "T"
    ],
    "obstacles": [
      [
        3,
        3
      ],
      [
        4,
        4
      ]
    ],
    "answer": {
      "levelId": 9,
      "placements": [
        {
          "pieceId": "L1",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              1
            ],
            [
              1,
              0,
              0
            ]
          ]
        },
        {
          "pieceId": "D2",
          "origin": {
            "row": 3,
            "col": 0
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "T3",
          "origin": {
            "row": 0,
            "col": 2
          },
          "matrix": [
            [
              0,
              1,
              0
            ],
            [
              1,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "T4",
          "origin": {
            "row": 1,
            "col": 0
          },
          "matrix": [
            [
              0,
              1,
              0
            ],
            [
              1,
              1,
              1
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 10,
    "name": "\u56db\u5468\u7559\u7a7a",
    "size": 5,
    "rows": [
      3,
      5,
      5,
      5,
      3
    ],
    "cols": [
      3,
      5,
      5,
      5,
      3
    ],
    "blocks": [
      "Q",
      "Q",
      "W",
      "W"
    ],
    "obstacles": [],
    "fixedBlocks": [
      [
        2,
        2
      ]
    ],
    "answer": {
      "levelId": 10,
      "placements": [
        {
          "pieceId": "Q1",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              0,
              1,
              0
            ],
            [
              1,
              1,
              1
            ],
            [
              0,
              1,
              0
            ]
          ]
        },
        {
          "pieceId": "Q2",
          "origin": {
            "row": 2,
            "col": 2
          },
          "matrix": [
            [
              0,
              1,
              0
            ],
            [
              1,
              1,
              1
            ],
            [
              0,
              1,
              0
            ]
          ]
        },
        {
          "pieceId": "W3",
          "origin": {
            "row": 0,
            "col": 2
          },
          "matrix": [
            [
              1,
              1,
              0
            ],
            [
              0,
              1,
              1
            ],
            [
              0,
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "W4",
          "origin": {
            "row": 2,
            "col": 0
          },
          "matrix": [
            [
              1,
              0,
              0
            ],
            [
              1,
              1,
              0
            ],
            [
              0,
              1,
              1
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 11,
    "name": "\u6709\u6ca1\u6709\u70b9\u50cf\u5b54\u660e\u9501?",
    "size": 5,
    "rows": [
      3,
      5,
      5,
      5,
      3
    ],
    "cols": [
      3,
      5,
      5,
      5,
      3
    ],
    "blocks": [
      "Q",
      "Z",
      "Z",
      "Z",
      "Z"
    ],
    "obstacles": [],
    "answer": {
      "levelId": 11,
      "placements": [
        {
          "pieceId": "Q1",
          "origin": {
            "row": 1,
            "col": 1
          },
          "matrix": [
            [
              0,
              1,
              0
            ],
            [
              1,
              1,
              1
            ],
            [
              0,
              1,
              0
            ]
          ]
        },
        {
          "pieceId": "Z2",
          "origin": {
            "row": 0,
            "col": 2
          },
          "matrix": [
            [
              1,
              1,
              0
            ],
            [
              0,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "Z3",
          "origin": {
            "row": 3,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              0
            ],
            [
              0,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "Z4",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              0,
              1
            ],
            [
              1,
              1
            ],
            [
              1,
              0
            ]
          ]
        },
        {
          "pieceId": "Z5",
          "origin": {
            "row": 2,
            "col": 3
          },
          "matrix": [
            [
              0,
              1
            ],
            [
              1,
              1
            ],
            [
              1,
              0
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 12,
    "name": "\u7231\u4f60\u54e6",
    "size": 5,
    "rows": [
      2,
      5,
      5,
      3,
      1
    ],
    "cols": [
      2,
      4,
      4,
      4,
      2
    ],
    "blocks": [
      "D",
      "W",
      "S",
      "T"
    ],
    "obstacles": [
      [
        0,
        2
      ],
      [
        4,
        0
      ],
      [
        4,
        4
      ]
    ],
    "answer": {
      "levelId": 12,
      "placements": [
        {
          "pieceId": "D1",
          "origin": {
            "row": 2,
            "col": 2
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "W2",
          "origin": {
            "row": 2,
            "col": 0
          },
          "matrix": [
            [
              1,
              1,
              0
            ],
            [
              0,
              1,
              1
            ],
            [
              0,
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "S3",
          "origin": {
            "row": 0,
            "col": 3
          },
          "matrix": [
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "T4",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              0,
              1,
              0
            ],
            [
              1,
              1,
              1
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 13,
    "name": "\u662f\u771f\u7684",
    "size": 6,
    "rows": [
      2,
      6,
      6,
      4,
      2,
      0
    ],
    "cols": [
      2,
      4,
      4,
      4,
      4,
      2
    ],
    "blocks": [
      "Z",
      "S",
      "P",
      "P"
    ],
    "obstacles": [
      [
        4,
        0
      ],
      [
        5,
        0
      ],
      [
        5,
        1
      ],
      [
        4,
        5
      ],
      [
        5,
        4
      ],
      [
        5,
        5
      ]
    ],
    "answer": {
      "levelId": 13,
      "placements": [
        {
          "pieceId": "Z1",
          "origin": {
            "row": 0,
            "col": 0
          },
          "matrix": [
            [
              0,
              1
            ],
            [
              1,
              1
            ],
            [
              1,
              0
            ]
          ]
        },
        {
          "pieceId": "S2",
          "origin": {
            "row": 0,
            "col": 4
          },
          "matrix": [
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "P3",
          "origin": {
            "row": 2,
            "col": 2
          },
          "matrix": [
            [
              0,
              1,
              1
            ],
            [
              0,
              1,
              1
            ],
            [
              1,
              1,
              0
            ]
          ]
        },
        {
          "pieceId": "P4",
          "origin": {
            "row": 1,
            "col": 1
          },
          "matrix": [
            [
              0,
              1,
              1
            ],
            [
              1,
              1,
              0
            ],
            [
              1,
              1,
              0
            ]
          ]
        }
      ]
    }
  },
  {
    "id": 14,
    "name": "\u6211\u559c\u6b22\u4f60,\u4f60\u559c\u6b22\u6211",
    "size": 7,
    "rows": [
      2,
      6,
      7,
      7,
      5,
      3,
      1
    ],
    "cols": [
      3,
      5,
      5,
      5,
      5,
      5,
      3
    ],
    "blocks": [
      "U",
      "L",
      "L",
      "Z"
    ],
    "obstacles": [
      [
        5,
        0
      ],
      [
        6,
        0
      ],
      [
        6,
        1
      ],
      [
        5,
        6
      ],
      [
        6,
        5
      ],
      [
        6,
        6
      ],
      [
        0,
        3
      ]
    ],
    "fixedBlocks": [
      [
        1,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        1
      ],
      [
        2,
        1
      ],
      [
        1,
        2
      ],
      [
        0,
        5
      ],
      [
        1,
        4
      ],
      [
        1,
        5
      ],
      [
        1,
        6
      ],
      [
        2,
        5
      ],
      [
        5,
        2
      ],
      [
        5,
        3
      ],
      [
        5,
        4
      ],
      [
        6,
        3
      ]
    ],
    "answer": {
      "levelId": 14,
      "placements": [
        {
          "pieceId": "U1",
          "origin": {
            "row": 2,
            "col": 0
          },
          "matrix": [
            [
              1,
              0,
              1
            ],
            [
              1,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "L2",
          "origin": {
            "row": 2,
            "col": 3
          },
          "matrix": [
            [
              1,
              1
            ],
            [
              0,
              1
            ],
            [
              0,
              1
            ]
          ]
        },
        {
          "pieceId": "L3",
          "origin": {
            "row": 3,
            "col": 1
          },
          "matrix": [
            [
              0,
              0,
              1
            ],
            [
              1,
              1,
              1
            ]
          ]
        },
        {
          "pieceId": "Z4",
          "origin": {
            "row": 2,
            "col": 5
          },
          "matrix": [
            [
              0,
              1
            ],
            [
              1,
              1
            ],
            [
              1,
              0
            ]
          ]
        }
      ]
    }
  }
];
  class LevelService {
    constructor(levels = ENDFIELD_LEVELS) {
      this.levels = levels;
    }

    get total() {
      return this.levels.length;
    }

    loadById(levelId) {
      const index = this.levels.findIndex((level) => level.id === levelId);
      return this.loadByIndex(index >= 0 ? index : 0);
    }

    loadByIndex(index) {
      const safeIndex = Math.min(Math.max(index, 0), this.levels.length - 1);
      return {
        index: safeIndex,
        level: this.levels[safeIndex]
      };
    }

    getNextIndex(currentIndex) {
      return (currentIndex + 1) % this.levels.length;
    }

    getPreviousIndex(currentIndex) {
      return (currentIndex - 1 + this.levels.length) % this.levels.length;
    }
  }

  const endfieldLevelService = new LevelService();

  function createElement(tag, className, attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.entries(attributes).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (key === "text") {
        element.textContent = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    return element;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function cloneMatrix(matrix) {
    return matrix.map((row) => [...row]);
  }

  function rotateMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        rotated[col][rows - row - 1] = matrix[row][col];
      }
    }
    return rotated;
  }

  function occupiedCells(matrix, origin = { row: 0, col: 0 }) {
    const cells = [];
    matrix.forEach((line, row) => {
      line.forEach((value, col) => {
        if (value) cells.push({ row: origin.row + row, col: origin.col + col });
      });
    });
    return cells;
  }

  function normalizePieceConfig(pieceConfig, index) {
    if (typeof pieceConfig === "string") {
      return {
        id: `${pieceConfig}${index + 1}`,
        shape: pieceConfig,
        color: PIECE_COLORS.default
      };
    }

    const shape = pieceConfig.shape || pieceConfig.type || "O";
    return {
      id: pieceConfig.id || `${shape}${index + 1}`,
      shape,
      color: pieceConfig.color || PIECE_COLORS.default
    };
  }

  function colorToSkin(color) {
    return PIECE_COLORS[color]?.skin || PIECE_COLORS[PIECE_COLORS.default].skin;
  }

  const DEFAULT_COLOR = PIECE_COLORS.default;
  const SKIN_CLASSES = Object.keys(PIECE_COLORS)
    .filter((color) => color !== "default")
    .map((color) => `skin-${colorToSkin(color)}`);

  function normalizeColorTargets(targets, size) {
    const zeroes = () => Array(size).fill(0);
    if (Array.isArray(targets)) {
      return { [DEFAULT_COLOR]: [...targets, ...zeroes()].slice(0, size) };
    }
    if (!targets || typeof targets !== "object") {
      return { [DEFAULT_COLOR]: zeroes() };
    }
    return Object.fromEntries(
      Object.entries(targets).map(([color, values]) => [
        color,
        [...(Array.isArray(values) ? values : []), ...zeroes()].slice(0, size)
      ])
    );
  }

  function normalizeFixedBlocks(fixedBlocks = []) {
    return fixedBlocks.map((block, index) => {
      if (Array.isArray(block)) {
        const [row, col, color = DEFAULT_COLOR] = block;
        return { id: `fixed-${index + 1}`, row, col, color, skin: colorToSkin(color) };
      }
      const color = block.color || DEFAULT_COLOR;
      return {
        id: block.id || `fixed-${index + 1}`,
        row: block.row,
        col: block.col,
        color,
        skin: colorToSkin(color)
      };
    });
  }

  function getBlockColor(block) {
    return typeof block === "string" ? DEFAULT_COLOR : block.color || DEFAULT_COLOR;
  }

  class PuzzleBoard {
    constructor(root) {
      this.root = root;
      this.level = null;
      this.targets = { rows: {}, cols: {}, colors: [DEFAULT_COLOR] };
      this.fixedBlocks = [];
      this.placedPieces = new Map();
      this.cellElements = [];
      this.previewCells = [];
      this.hintCells = [];
    }

    loadLevel(level) {
      this.level = level;
      this.placedPieces.clear();
      this.clearAnswerHint();
      this.fixedBlocks = normalizeFixedBlocks(level.fixedBlocks || level.litBlocks || level.fixedCells);
      this.targets = this.createTargets(level);
      this.render();
    }

    render() {
      const size = this.getSize();
      this.root.innerHTML = "";
      this.root.style.setProperty("--board-size", size);
      this.cellElements = [];

      const colHints = createElement("div", "endfield-hints endfield-hints--cols");
      const rowHints = createElement("div", "endfield-hints endfield-hints--rows");
      const matrix = createElement("div", "endfield-board__matrix");

      for (let col = 0; col < size; col += 1) {
        const stack = createElement("div", "endfield-hint-stack endfield-hint-stack--col");
        this.targets.colors.forEach((color) => {
          stack.appendChild(this.createHint("col", col, this.targets.cols[color]?.[col] || 0, color));
        });
        colHints.appendChild(stack);
      }

      for (let row = 0; row < size; row += 1) {
        const stack = createElement("div", "endfield-hint-stack endfield-hint-stack--row");
        this.targets.colors.forEach((color) => {
          stack.appendChild(this.createHint("row", row, this.targets.rows[color]?.[row] || 0, color));
        });
        rowHints.appendChild(stack);
        for (let col = 0; col < size; col += 1) {
          const cell = createElement("div", "endfield-cell", { "data-row": row, "data-col": col });
          if (this.isObstacle(row, col)) cell.classList.add("is-obstacle");
          const fixedBlock = this.getFixedBlock(row, col);
          if (fixedBlock) {
            cell.classList.add("is-fixed", "is-filled", `skin-${fixedBlock.skin}`);
            cell.dataset.fixedColor = fixedBlock.color;
          }
          matrix.appendChild(cell);
          this.cellElements.push(cell);
        }
      }

      this.root.appendChild(colHints);
      this.root.appendChild(rowHints);
      this.root.appendChild(matrix);
      this.updateStats();
    }

    createTargets(level) {
      const size = this.getSize();
      const rows = normalizeColorTargets(level.rows, size);
      const cols = normalizeColorTargets(level.cols, size);
      const blockColors = (level.blocks || []).map(getBlockColor);
      const fixedColors = this.fixedBlocks.map((block) => block.color);
      const colors = [...new Set([...Object.keys(rows), ...Object.keys(cols), ...blockColors, ...fixedColors])];
      colors.forEach((color) => {
        rows[color] ||= Array(size).fill(0);
        cols[color] ||= Array(size).fill(0);
      });
      return {
        rows,
        cols,
        colors: colors.length ? colors : [DEFAULT_COLOR]
      };
    }

    createHint(axis, index, target, color = DEFAULT_COLOR) {
      const skin = colorToSkin(color);
      const hint = createElement("div", `endfield-hint endfield-hint--${axis} skin-${skin}`, {
        [`data-${axis}-hint`]: index,
        "data-color": color,
        "aria-label": `${axis === "col" ? "\u5217" : "\u884c"}${color}\u76ee\u6807 ${target}`
      });
      for (let item = 0; item < target; item += 1) {
        hint.appendChild(createElement("span", "hint-bar"));
      }
      return hint;
    }

    getSize() {
      return this.level?.size || 4;
    }

    getCell(row, col) {
      return this.root.querySelector(`.endfield-cell[data-row="${row}"][data-col="${col}"]`);
    }

    getCellFromPoint(clientX, clientY) {
      const element = this.cellElements.find((cell) => {
        const rect = cell.getBoundingClientRect();
        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      });
      if (!element) return null;
      return { row: Number(element.dataset.row), col: Number(element.dataset.col) };
    }

    isObstacle(row, col) {
      return this.level?.obstacles?.some(([obstacleRow, obstacleCol]) => obstacleRow === row && obstacleCol === col);
    }

    getFixedBlock(row, col) {
      return this.fixedBlocks.find((block) => block.row === row && block.col === col);
    }

    canPlace(piece, origin, options = {}) {
      const size = this.getSize();
      const cells = occupiedCells(piece.matrix, origin);
      return cells.every(({ row, col }) => {
        if (row < 0 || col < 0 || row >= size || col >= size) return false;
        if (this.isObstacle(row, col)) return false;
        if (this.getFixedBlock(row, col)) return false;
        for (const [pieceId, placed] of this.placedPieces.entries()) {
          if (pieceId === options.ignoreId) continue;
          if (occupiedCells(placed.matrix, placed.origin).some((cell) => cell.row === row && cell.col === col)) return false;
        }
        return true;
      });
    }

    placePiece(piece, origin) {
      this.placedPieces.set(piece.id, {
        id: piece.id,
        shape: piece.shape,
        color: piece.color,
        skin: piece.skin,
        matrix: cloneMatrix(piece.matrix),
        origin: { ...origin }
      });
      this.paintPlacedCells();
      this.updateStats();
    }

    removePiece(pieceId) {
      this.placedPieces.delete(pieceId);
      this.paintPlacedCells();
      this.updateStats();
    }

    getPlacedPieceAt(row, col) {
      for (const placed of this.placedPieces.values()) {
        if (occupiedCells(placed.matrix, placed.origin).some((cell) => cell.row === row && cell.col === col)) return placed;
      }
      return null;
    }

    paintPlacedCells() {
      this.cellElements.forEach((cell) => {
        cell.classList.remove("is-filled", "is-fixed", "is-placed-flash", ...SKIN_CLASSES);
        cell.removeAttribute("data-piece-id");
        cell.removeAttribute("data-fixed-color");
      });

      this.fixedBlocks.forEach((fixedBlock) => {
        const cell = this.getCell(fixedBlock.row, fixedBlock.col);
        if (!cell) return;
        cell.classList.add("is-filled", "is-fixed", `skin-${fixedBlock.skin}`);
        cell.dataset.fixedColor = fixedBlock.color;
      });

      for (const placed of this.placedPieces.values()) {
        occupiedCells(placed.matrix, placed.origin).forEach(({ row, col }) => {
          const cell = this.getCell(row, col);
          if (!cell) return;
          cell.classList.add("is-filled", `skin-${placed.skin}`, "is-placed-flash");
          cell.dataset.pieceId = placed.id;
        });
      }
    }

    preview(piece, origin, valid) {
      this.clearPreview();
      occupiedCells(piece.matrix, origin).forEach(({ row, col }) => {
        const cell = this.getCell(row, col);
        if (!cell) return;
        cell.classList.add(valid ? "is-preview-valid" : "is-preview-invalid");
        this.previewCells.push(cell);
      });
    }

    clearPreview() {
      this.previewCells.forEach((cell) => cell.classList.remove("is-preview-valid", "is-preview-invalid"));
      this.previewCells = [];
    }

    showAnswerHint(answer) {
      this.clearAnswerHint();
      answer?.placements?.forEach((placement) => {
        occupiedCells(placement.matrix, placement.origin).forEach(({ row, col }) => {
          const cell = this.getCell(row, col);
          if (!cell || cell.classList.contains("is-fixed")) return;
          cell.classList.add("is-answer-hint");
          this.hintCells.push(cell);
        });
      });
    }

    clearAnswerHint() {
      this.hintCells.forEach((cell) => cell.classList.remove("is-answer-hint"));
      this.hintCells = [];
    }

    getStats() {
      const size = this.getSize();
      const rows = Object.fromEntries(this.targets.colors.map((color) => [color, Array(size).fill(0)]));
      const cols = Object.fromEntries(this.targets.colors.map((color) => [color, Array(size).fill(0)]));
      this.fixedBlocks.forEach(({ row, col, color }) => {
        if (!rows[color]) {
          rows[color] = Array(size).fill(0);
          cols[color] = Array(size).fill(0);
        }
        if (row >= 0 && row < size) rows[color][row] += 1;
        if (col >= 0 && col < size) cols[color][col] += 1;
      });
      for (const placed of this.placedPieces.values()) {
        occupiedCells(placed.matrix, placed.origin).forEach(({ row, col }) => {
          const color = placed.color || DEFAULT_COLOR;
          if (!rows[color]) {
            rows[color] = Array(size).fill(0);
            cols[color] = Array(size).fill(0);
          }
          rows[color][row] += 1;
          cols[color][col] += 1;
        });
      }
      return { rows, cols };
    }

    updateStats() {
      if (!this.level) return;
      const stats = this.getStats();
      this.targets.colors.forEach((color) => {
        stats.rows[color].forEach((count, row) => {
          this.updateHint(`[data-row-hint="${row}"][data-color="${color}"]`, count, this.targets.rows[color]?.[row] || 0);
        });
        stats.cols[color].forEach((count, col) => {
          this.updateHint(`[data-col-hint="${col}"][data-color="${color}"]`, count, this.targets.cols[color]?.[col] || 0);
        });
      });
    }

    updateHint(selector, current, target) {
      const hint = this.root.querySelector(selector);
      if (!hint) return;
      hint.classList.toggle("is-met", current === target);
      hint.classList.toggle("is-over", current > target);
      hint.dataset.current = current;

      hint.querySelectorAll(".hint-bar").forEach((bar, index) => {
        bar.classList.toggle("is-lit", index < current && current <= target);
      });
    }

    isCompleted() {
      const stats = this.getStats();
      const size = this.getSize();
      if (this.placedPieces.size === 0) return false;
      for (let index = 0; index < size; index += 1) {
        for (const color of this.targets.colors) {
          if (stats.rows[color][index] !== (this.targets.rows[color]?.[index] || 0)) return false;
          if (stats.cols[color][index] !== (this.targets.cols[color]?.[index] || 0)) return false;
        }
      }
      return true;
    }
  }

  class PuzzlePiece {
    constructor(pieceConfig, index, handlers = {}) {
      const config = normalizePieceConfig(pieceConfig, index);
      this.id = config.id;
      this.shape = config.shape;
      this.type = config.shape;
      this.color = config.color;
      this.skin = colorToSkin(config.color);
      this.matrix = cloneMatrix(PIECE_SHAPES[this.shape] || PIECE_SHAPES.O);
      this.initialMatrix = cloneMatrix(this.matrix);
      this.origin = null;
      this.handlers = handlers;
      this.element = this.render();
    }

    render() {
      const element = createElement("button", `endfield-piece skin-${this.skin}`, {
        type: "button",
        "aria-label": `${this.shape} \u578b\u62fc\u5757`
      });
      element.dataset.pieceId = this.id;
      element.dataset.shape = this.shape;
      element.addEventListener("pointerdown", (event) => this.handlers.pointerDown?.(this, event));
      element.addEventListener("mousedown", (event) => {
        if (window.PointerEvent) return;
        this.handlers.pointerDown?.(this, event);
      });
      element.addEventListener("click", () => this.handlers.select?.(this));
      element.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        this.handlers.rotate?.(this, event);
      });
      element.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() !== "r") return;
        event.preventDefault();
        event.stopPropagation();
        this.handlers.rotate?.(this, event);
      });
      this.element = element;
      this.updateElement();
      return element;
    }

    updateElement() {
      this.element.style.setProperty("--piece-cols", this.matrix[0].length);
      this.element.style.setProperty("--piece-rows", this.matrix.length);
      this.element.innerHTML = "";
      this.matrix.forEach((row) => {
        row.forEach((value) => {
          this.element.appendChild(createElement("span", value ? "piece-cell is-on" : "piece-cell"));
        });
      });
    }

    rotate() {
      this.matrix = rotateMatrix(this.matrix);
      this.updateElement();
    }

    setPlaced(origin) {
      this.origin = { ...origin };
      this.element.hidden = true;
      this.element.classList.add("is-placed");
      this.element.classList.remove("is-dragging", "is-invalid", "is-selected");
    }

    setInTray(options = {}) {
      this.origin = null;
      if (options.resetMatrix) {
        this.matrix = cloneMatrix(this.initialMatrix);
        this.updateElement();
      }
      this.element.hidden = false;
      this.element.classList.remove("is-placed", "is-dragging", "is-invalid", "is-selected", "is-rotating");
      this.element.style.width = "";
      this.element.style.height = "";
      this.element.style.left = "";
      this.element.style.top = "";
    }

    setMatrix(matrix) {
      this.matrix = cloneMatrix(matrix);
      this.updateElement();
    }
  }

  class SaveManager {
    constructor(storageKey = "endfield-save-v1") {
      this.storageKey = storageKey;
    }

    read() {
      try {
        return JSON.parse(localStorage.getItem(this.storageKey)) || {};
      } catch {
        return {};
      }
    }

    write(data) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify({ ...this.read(), ...data, updatedAt: Date.now() }));
      } catch {
        // Some local file contexts block storage; gameplay should still run.
      }
    }

    getCurrentLevelId() {
      return this.read().currentLevelId || 1;
    }

    setCurrentLevelId(levelId) {
      this.write({ currentLevelId: levelId });
    }

    markCompleted(levelId) {
      const save = this.read();
      const completedLevels = Array.from(new Set([...(save.completedLevels || []), levelId])).sort((a, b) => a - b);
      this.write({ completedLevels, currentLevelId: levelId });
    }

    recordReset(levelId) {
      const save = this.read();
      const resets = save.resets || {};
      resets[levelId] = (resets[levelId] || 0) + 1;
      this.write({ resets });
    }

    getResetCount(levelId) {
      return this.read().resets?.[levelId] || 0;
    }

    getCompletedCount() {
      return this.read().completedLevels?.length || 0;
    }
  }

  class LevelManager {
    constructor(saveManager, levelService = endfieldLevelService) {
      this.saveManager = saveManager;
      this.levelService = levelService;
      this.currentIndex = 0;
    }

    get total() {
      return this.levelService.total;
    }

    loadById(levelId) {
      const result = this.levelService.loadById(levelId);
      this.currentIndex = result.index;
      this.saveManager.setCurrentLevelId(result.level.id);
      return result.level;
    }

    loadByIndex(index) {
      const result = this.levelService.loadByIndex(index);
      this.currentIndex = result.index;
      this.saveManager.setCurrentLevelId(result.level.id);
      return result.level;
    }

    loadSaved() {
      return this.loadById(this.saveManager.getCurrentLevelId());
    }

    next() {
      return this.loadByIndex(this.levelService.getNextIndex(this.currentIndex));
    }

    previous() {
      return this.loadByIndex(this.levelService.getPreviousIndex(this.currentIndex));
    }
  }

  class UIManager {
    constructor(root) {
      this.nodes = {
        levelName: root.querySelector("[data-level-name]"),
        levelIndex: root.querySelector("[data-level-index]"),
        progress: root.querySelector("[data-progress]"),
        timer: root.querySelector("[data-timer]"),
        resets: root.querySelector("[data-resets]"),
        toast: root.querySelector("[data-toast]"),
        complete: root.querySelector("[data-complete]")
      };
      this.toastTimer = null;
    }

    updateLevel(level, total, completedCount, resets) {
      this.nodes.levelName.textContent = level.name;
      this.nodes.levelIndex.textContent = `${level.id}/${total}`;
      this.nodes.progress.textContent = `${completedCount}/${total}`;
      this.nodes.resets.textContent = resets;
    }

    updateTimer(seconds) {
      const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
      const remain = Math.floor(seconds % 60).toString().padStart(2, "0");
      this.nodes.timer.textContent = `${minutes}:${remain}`;
    }

    showToast(message, tone = "info") {
      window.clearTimeout(this.toastTimer);
      this.nodes.toast.textContent = message;
      this.nodes.toast.dataset.tone = tone;
      this.nodes.toast.hidden = false;
      requestAnimationFrame(() => this.nodes.toast.classList.add("is-visible"));
      this.toastTimer = window.setTimeout(() => {
        this.nodes.toast.classList.remove("is-visible");
        window.setTimeout(() => {
          this.nodes.toast.hidden = true;
        }, 180);
      }, 1500);
    }

    showComplete(levelName) {
      this.nodes.complete.querySelector("[data-complete-title]").textContent = `${levelName} 已完成`;
      this.nodes.complete.hidden = false;
      requestAnimationFrame(() => this.nodes.complete.classList.add("is-visible"));
    }

    hideComplete() {
      this.nodes.complete.classList.remove("is-visible");
      window.setTimeout(() => {
        this.nodes.complete.hidden = true;
      }, 180);
    }
  }

  class EndfieldGame {
    constructor(root) {
      this.root = root;
      this.board = new PuzzleBoard(root.querySelector("[data-board]"));
      this.save = new SaveManager();
      this.levelManager = new LevelManager(this.save);
      this.ui = new UIManager(root);
      this.tray = root.querySelector("[data-piece-tray]");
      this.dragLayer = root.querySelector("[data-drag-layer]");
      this.pieces = [];
      this.dragState = null;
      this.selectedPiece = null;
      this.currentLevel = null;
      this.startedAt = Date.now();
    }

    init() {
      this.bindControls();
      this.loadLevel(this.levelManager.loadSaved());
      window.setInterval(() => this.ui.updateTimer((Date.now() - this.startedAt) / 1000), 1000);
    }

    bindControls() {
      this.root.querySelector("[data-action='reset']").addEventListener("click", () => this.resetLevel(true));
      this.root.querySelector("[data-action='next']").addEventListener("click", () => this.loadLevel(this.levelManager.next(), true));
      this.root.querySelector("[data-action='previous']").addEventListener("click", () => this.loadLevel(this.levelManager.previous(), true));
      this.root.querySelector("[data-action='hint']").addEventListener("click", () => this.showHint());
      this.root.querySelector("[data-action='answer']").addEventListener("click", () => this.showAnswer());
      this.root.querySelector("[data-action='start']").addEventListener("click", () => {
        this.ui.showToast("\u7ec8\u672b\u5730\u7cfb\u7edf\u5df2\u542f\u52a8", "success");
        this.root.querySelector("[data-board]").scrollIntoView({ block: "center", behavior: "smooth" });
      });
      this.root.querySelector("[data-action='complete-next']").addEventListener("click", () => {
        this.ui.hideComplete();
        this.loadLevel(this.levelManager.next(), true);
      });

      const boardElement = this.root.querySelector("[data-board]");
      boardElement.addEventListener("pointerdown", (event) => this.handleBoardPointerDown(event));
      boardElement.addEventListener("mousedown", (event) => {
        if (window.PointerEvent) return;
        this.handleBoardPointerDown(event);
      });
      boardElement.addEventListener("contextmenu", (event) => this.handleBoardContextMenu(event));

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && this.dragState) {
          this.cancelDrag();
          return;
        }
        if (event.key.toLowerCase() !== "r" || !this.selectedPiece) return;
        event.preventDefault();
        this.rotatePiece(this.selectedPiece);
      });
    }

    loadLevel(level, transition = false) {
      this.currentLevel = level;
      this.startedAt = Date.now();
      this.dragState = null;
      this.selectedPiece = null;
      this.board.loadLevel(level);
      this.createPieces(level.blocks);
      this.ui.updateLevel(level, this.levelManager.total, this.save.getCompletedCount(), this.save.getResetCount(level.id));
      this.ui.updateTimer(0);
      if (transition) {
        this.root.classList.remove("is-transitioning");
        this.root.offsetWidth;
        this.root.classList.add("is-transitioning");
      }
    }

    createPieces(blocks) {
      this.tray.innerHTML = "";
      this.pieces = blocks.map((config, index) => {
        const piece = new PuzzlePiece(config, index, {
          pointerDown: (activePiece, event) => this.startDrag(activePiece, event),
          rotate: (activePiece) => this.rotatePiece(activePiece),
          select: (activePiece) => this.selectPiece(activePiece)
        });
        this.tray.appendChild(piece.element);
        return piece;
      });
    }

    resetLevel(countReset = false) {
      if (countReset) this.save.recordReset(this.currentLevel.id);
      this.board.loadLevel(this.currentLevel);
      this.pieces.forEach((piece) => {
        piece.setInTray({ resetMatrix: true });
        this.tray.appendChild(piece.element);
      });
      this.ui.updateLevel(this.currentLevel, this.levelManager.total, this.save.getCompletedCount(), this.save.getResetCount(this.currentLevel.id));
      this.ui.showToast("\u5173\u5361\u5df2\u91cd\u7f6e", "info");
    }

    showHint() {
      if (!this.currentLevel?.answer) {
        this.ui.showToast("\u5f53\u524d\u5173\u5361\u6682\u65e0\u63d0\u793a", "warning");
        return;
      }

      this.board.showAnswerHint(this.currentLevel.answer);
      this.ui.showToast("\u5df2\u6807\u51fa\u9700\u8981\u586b\u5145\u7684\u533a\u5757", "info");
    }

    showAnswer() {
      const answer = this.currentLevel?.answer;
      if (!answer?.placements?.length) {
        this.ui.showToast("\u5f53\u524d\u5173\u5361\u6682\u65e0\u7b54\u6848", "warning");
        return;
      }

      this.board.loadLevel(this.currentLevel);
      this.pieces.forEach((piece) => {
        const placement = answer.placements.find((item) => item.pieceId === piece.id);
        if (!placement) {
          piece.setInTray({ resetMatrix: true });
          this.tray.appendChild(piece.element);
          return;
        }

        piece.setMatrix(placement.matrix);
        if (this.board.canPlace(piece, placement.origin, { ignoreId: piece.id })) {
          this.board.placePiece(piece, placement.origin);
          piece.setPlaced(placement.origin);
        } else {
          piece.setInTray();
        }
        this.tray.appendChild(piece.element);
      });
      this.board.clearAnswerHint();
      this.ui.showToast("\u7b54\u6848\u5df2\u663e\u793a", "success");
    }

    selectPiece(piece) {
      this.selectedPiece?.element.classList.remove("is-selected");
      this.selectedPiece = piece;
      piece.element.classList.add("is-selected");
    }

    handleBoardPointerDown(event) {
      if (event.button !== 0 && (event.pointerType === "mouse" || event.type === "mousedown")) return;
      const cell = event.target.closest(".endfield-cell.is-filled");
      if (!cell) return;
      const placed = this.board.getPlacedPieceAt(Number(cell.dataset.row), Number(cell.dataset.col));
      const piece = this.pieces.find((item) => item.id === placed?.id);
      if (piece) this.startDrag(piece, event, { centered: true });
    }

    handleBoardContextMenu(event) {
      const cell = event.target.closest(".endfield-cell.is-filled");
      if (!cell) return;
      event.preventDefault();
      const placed = this.board.getPlacedPieceAt(Number(cell.dataset.row), Number(cell.dataset.col));
      const piece = this.pieces.find((item) => item.id === placed?.id);
      if (piece) this.rotatePiece(piece);
    }

    startDrag(piece, event, options = {}) {
      if (event.button !== undefined && event.button !== 0) return;
      if (this.dragState) this.cancelDrag();
      event.preventDefault();
      event.stopPropagation();
      this.selectPiece(piece);

      const pointerId = event.pointerId ?? "mouse";
      const wasPlaced = Boolean(piece.origin);
      const previousOrigin = wasPlaced ? { ...piece.origin } : null;
      if (wasPlaced) this.board.removePiece(piece.id);

      const sourceParent = piece.element.parentElement;
      const sourceNext = piece.element.nextSibling;
      piece.element.hidden = false;
      piece.element.classList.remove("is-placed");
      if (wasPlaced && !piece.element.parentElement) {
        this.dragLayer.appendChild(piece.element);
      }

      const rect = piece.element.getBoundingClientRect();
      const dragMetrics = this.measurePieceLayout(piece.element, rect);
      const anchor = this.getDragAnchor(piece, event, rect, options);
      piece.origin = null;
      this.dragState = {
        pointerId,
        piece,
        wasPlaced,
        previousOrigin,
        sourceParent,
        sourceNext,
        dragWidth: dragMetrics.width,
        dragHeight: dragMetrics.height,
        dragScale: 1,
        visualWidth: dragMetrics.width,
        visualHeight: dragMetrics.height,
        anchorRow: anchor.row,
        anchorCol: anchor.col,
        lastOrigin: null,
        lastValid: false
      };

      piece.element.classList.add("is-dragging");
      piece.element.classList.remove("is-selected");
      piece.element.style.width = `${dragMetrics.width}px`;
      piece.element.style.height = `${dragMetrics.height}px`;
      this.dragLayer.appendChild(piece.element);

      this.onDocumentMove = (moveEvent) => this.moveDrag(moveEvent);
      this.onDocumentEnd = (endEvent) => this.endDrag(endEvent);
      document.addEventListener("pointermove", this.onDocumentMove, { passive: false });
      document.addEventListener("pointerup", this.onDocumentEnd);
      document.addEventListener("pointercancel", this.onDocumentEnd);
      document.addEventListener("mousemove", this.onDocumentMove, { passive: false });
      document.addEventListener("mouseup", this.onDocumentEnd);

      this.positionDraggedPiece(event.clientX, event.clientY);
      this.moveDrag(event);
    }

    getDragAnchor(piece, event, rect, options = {}) {
      const occupied = [];
      piece.matrix.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (value) occupied.push({ row: rowIndex, col: colIndex });
        });
      });

      const centered = {
        row: Math.floor(piece.matrix.length / 2),
        col: Math.floor(piece.matrix[0].length / 2)
      };

      if (options.centered) {
        return occupied.find((cell) => cell.row === centered.row && cell.col === centered.col) || occupied[0] || centered;
      }

      const styles = window.getComputedStyle(piece.element);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const paddingTop = parseFloat(styles.paddingTop) || 0;
      const paddingBottom = parseFloat(styles.paddingBottom) || 0;
      const columnGap = parseFloat(styles.columnGap) || 0;
      const rowGap = parseFloat(styles.rowGap) || 0;
      const cols = piece.matrix[0].length;
      const rows = piece.matrix.length;
      const cellWidth = (rect.width - paddingLeft - paddingRight - columnGap * (cols - 1)) / cols;
      const cellHeight = (rect.height - paddingTop - paddingBottom - rowGap * (rows - 1)) / rows;
      const rawCol = clamp(Math.floor((event.clientX - rect.left - paddingLeft) / (cellWidth + columnGap)), 0, cols - 1);
      const rawRow = clamp(Math.floor((event.clientY - rect.top - paddingTop) / (cellHeight + rowGap)), 0, rows - 1);

      if (piece.matrix[rawRow]?.[rawCol]) return { row: rawRow, col: rawCol };

      return occupied.reduce((nearest, cell) => {
        const distance = Math.abs(cell.row - rawRow) + Math.abs(cell.col - rawCol);
        return distance < nearest.distance ? { ...cell, distance } : nearest;
      }, { ...(occupied[0] || centered), distance: Infinity });
    }

    moveDrag(event) {
      const pointerId = event.pointerId ?? "mouse";
      if (!this.dragState || pointerId !== this.dragState.pointerId) return;
      event.preventDefault();
      this.lastPointer = { clientX: event.clientX, clientY: event.clientY, pointerId };
      const { piece } = this.dragState;
      this.positionDraggedPiece(event.clientX, event.clientY);

      const anchorPoint = this.getDraggedAnchorPoint();
      const cell = anchorPoint ? this.board.getCellFromPoint(anchorPoint.clientX, anchorPoint.clientY) : null;
      if (!cell) {
        this.dragState.lastOrigin = null;
        this.dragState.lastValid = false;
        this.board.clearPreview();
        piece.element.classList.remove("is-invalid");
        return;
      }

      const origin = {
        row: clamp(cell.row - this.dragState.anchorRow, 0, this.board.getSize() - piece.matrix.length),
        col: clamp(cell.col - this.dragState.anchorCol, 0, this.board.getSize() - piece.matrix[0].length)
      };
      const valid = this.board.canPlace(piece, origin, { ignoreId: piece.id });
      this.dragState.lastOrigin = origin;
      this.dragState.lastValid = valid;
      this.board.preview(piece, origin, valid);
      piece.element.classList.toggle("is-invalid", !valid);
    }

    endDrag(event) {
      const pointerId = event.pointerId ?? "mouse";
      const isMouseFallback = event.type === "mouseup" && this.dragState?.pointerId !== "mouse";
      if (!this.dragState || (!isMouseFallback && pointerId !== this.dragState.pointerId)) return;
      const state = this.dragState;
      state.dropPoint = { clientX: event.clientX, clientY: event.clientY };
      this.cleanupDragListeners();
      this.dragState = null;
      this.board.clearPreview();

      const { piece } = state;
      piece.element.classList.remove("is-dragging", "is-invalid");
      piece.element.style.width = "";
      piece.element.style.height = "";
      piece.element.style.left = "";
      piece.element.style.top = "";

      if (this.isPointInTray(state.dropPoint?.clientX, state.dropPoint?.clientY)) {
        this.returnPieceToTray(piece, state);
        this.ui.showToast("\u5df2\u6536\u56de\u62fc\u5757\u4ed3", "info");
        return;
      }

      if (state.lastOrigin && state.lastValid) {
        piece.element.classList.add("is-snapping");
        window.setTimeout(() => piece.element.classList.remove("is-snapping"), 160);
        this.board.placePiece(piece, state.lastOrigin);
        piece.setPlaced(state.lastOrigin);
        this.tray.appendChild(piece.element);
        this.playSoundCue("place");
        this.checkCompletion();
        return;
      }

      this.failDrop(state);
    }

    failDrop(state) {
      const { piece } = state;
      piece.element.classList.add("is-rebounding");
      window.setTimeout(() => piece.element.classList.remove("is-rebounding"), 320);

      if (state.wasPlaced && state.previousOrigin && this.board.canPlace(piece, state.previousOrigin, { ignoreId: piece.id })) {
        this.board.placePiece(piece, state.previousOrigin);
        piece.setPlaced(state.previousOrigin);
        this.tray.appendChild(piece.element);
        this.ui.showToast("\u5df2\u56de\u5230\u539f\u4f4d\u7f6e", "warning");
        return;
      }

      this.returnPieceToTray(piece, state);
      this.ui.showToast("\u65e0\u6cd5\u653e\u7f6e\u5728\u8fd9\u91cc", "warning");
    }

    returnPieceToTray(piece, state = {}) {
      piece.setInTray();
      if (state.sourceParent === this.tray && state.sourceNext && this.tray.contains(state.sourceNext)) {
        state.sourceParent.insertBefore(piece.element, state.sourceNext);
      } else {
        this.tray.appendChild(piece.element);
      }
    }

    isPointInTray(clientX, clientY) {
      if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return false;
      const rect = this.tray.getBoundingClientRect();
      const dropPadding = 28;
      return (
        clientX >= rect.left - dropPadding &&
        clientX <= rect.right + dropPadding &&
        clientY >= rect.top - dropPadding &&
        clientY <= rect.bottom + dropPadding
      );
    }

    cancelDrag() {
      if (!this.dragState) return;
      const state = this.dragState;
      this.cleanupDragListeners();
      this.dragState = null;
      this.board.clearPreview();
      state.piece.element.classList.remove("is-dragging", "is-invalid");
      this.failDrop(state);
    }

    cleanupDragListeners() {
      document.removeEventListener("pointermove", this.onDocumentMove);
      document.removeEventListener("pointerup", this.onDocumentEnd);
      document.removeEventListener("pointercancel", this.onDocumentEnd);
      document.removeEventListener("mousemove", this.onDocumentMove);
      document.removeEventListener("mouseup", this.onDocumentEnd);
      this.onDocumentMove = null;
      this.onDocumentEnd = null;
    }

    measurePieceLayout(element, rect = element.getBoundingClientRect()) {
      return {
        width: element.offsetWidth || rect.width,
        height: element.offsetHeight || rect.height
      };
    }

    getDragScale(element) {
      const styles = window.getComputedStyle(element);
      const customScale = parseFloat(styles.getPropertyValue("--drag-scale"));
      if (Number.isFinite(customScale) && customScale > 0) return customScale;

      const transform = styles.transform;
      if (!transform || transform === "none") return 1;
      const matrix = transform.match(/^matrix\(([^)]+)\)$/);
      if (matrix) {
        const [a, b] = matrix[1].split(",").map((value) => parseFloat(value));
        const scale = Math.hypot(a || 0, b || 0);
        return scale || 1;
      }

      const matrix3d = transform.match(/^matrix3d\(([^)]+)\)$/);
      if (matrix3d) {
        const values = matrix3d[1].split(",").map((value) => parseFloat(value));
        const scale = Math.hypot(values[0] || 0, values[1] || 0, values[2] || 0);
        return scale || 1;
      }

      return 1;
    }

    syncDragMetrics() {
      const state = this.dragState;
      const { piece } = state;
      const width = piece.element.offsetWidth || state.dragWidth;
      const height = piece.element.offsetHeight || state.dragHeight;
      const scale = this.getDragScale(piece.element);

      state.dragWidth = width;
      state.dragHeight = height;
      state.dragScale = scale;
      state.visualWidth = width * scale;
      state.visualHeight = height * scale;
      return state;
    }

    getDragLayerPoint(clientX, clientY) {
      const rect = this.dragLayer.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    positionDraggedPiece(clientX, clientY) {
      const { piece, dragWidth, dragHeight } = this.syncDragMetrics();
      const point = this.getDragLayerPoint(clientX, clientY);
      piece.element.style.left = `${point.x - dragWidth / 2}px`;
      piece.element.style.top = `${point.y - dragHeight / 2}px`;
    }

    getDraggedAnchorPoint() {
      if (!this.dragState) return null;
      const { piece, anchorRow, anchorCol, dragWidth, dragHeight } = this.dragState;
      const rect = piece.element.getBoundingClientRect();
      const styles = window.getComputedStyle(piece.element);
      const cols = piece.matrix[0].length;
      const rows = piece.matrix.length;
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingTop = parseFloat(styles.paddingTop) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const paddingBottom = parseFloat(styles.paddingBottom) || 0;
      const columnGap = parseFloat(styles.columnGap) || 0;
      const rowGap = parseFloat(styles.rowGap) || 0;
      const cellWidth = (dragWidth - paddingLeft - paddingRight - columnGap * (cols - 1)) / cols;
      const cellHeight = (dragHeight - paddingTop - paddingBottom - rowGap * (rows - 1)) / rows;
      const scaleX = dragWidth ? rect.width / dragWidth : 1;
      const scaleY = dragHeight ? rect.height / dragHeight : 1;

      return {
        clientX: rect.left + (paddingLeft + anchorCol * (cellWidth + columnGap) + cellWidth / 2) * scaleX,
        clientY: rect.top + (paddingTop + anchorRow * (cellHeight + rowGap) + cellHeight / 2) * scaleY
      };
    }

    rotatePiece(piece) {
      this.selectPiece(piece);
      if (this.dragState?.piece === piece) piece.element.classList.remove("is-selected");
      const previousMatrix = cloneMatrix(piece.matrix);
      const previousOrigin = piece.origin ? { ...piece.origin } : null;

      if (piece.origin) this.board.removePiece(piece.id);
      piece.rotate();

      if (this.dragState?.piece === piece) {
        piece.element.style.width = "";
        piece.element.style.height = "";
        const rect = piece.element.getBoundingClientRect();
        const dragMetrics = this.measurePieceLayout(piece.element, rect);
        const anchor = this.getDragAnchor(piece, this.lastPointer || { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, rect, { centered: true });
        this.dragState.dragWidth = dragMetrics.width;
        this.dragState.dragHeight = dragMetrics.height;
        this.dragState.anchorRow = anchor.row;
        this.dragState.anchorCol = anchor.col;
        piece.element.style.width = `${dragMetrics.width}px`;
        piece.element.style.height = `${dragMetrics.height}px`;
        if (this.lastPointer) {
          this.moveDrag({ ...this.lastPointer, preventDefault() {} });
        }
        return;
      }

      if (!previousOrigin) return;

      if (this.board.canPlace(piece, previousOrigin, { ignoreId: piece.id })) {
        this.board.placePiece(piece, previousOrigin);
        piece.setPlaced(previousOrigin);
        this.checkCompletion();
        return;
      }

      piece.matrix = previousMatrix;
      piece.updateElement();
      this.board.placePiece(piece, previousOrigin);
      piece.setPlaced(previousOrigin);
      this.ui.showToast("\u65cb\u8f6c\u7a7a\u95f4\u4e0d\u8db3", "warning");
    }

    playSoundCue(name) {
      this.root.dispatchEvent(new CustomEvent("endfield:sound", { detail: { name } }));
    }

    checkCompletion() {
      if (!this.board.isCompleted()) return;
      this.save.markCompleted(this.currentLevel.id);
      this.ui.updateLevel(this.currentLevel, this.levelManager.total, this.save.getCompletedCount(), this.save.getResetCount(this.currentLevel.id));
      this.ui.showComplete(this.currentLevel.name);
    }
  }

  function boot() {
    const root = document.querySelector("[data-endfield-game]");
    if (!root) return;
    new EndfieldGame(root).init();
    root.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
