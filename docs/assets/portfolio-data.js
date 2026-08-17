/* Kayden Clark - portfolio
   SHARED SYNTHETIC DATASET (docs/assets/portfolio-data.js)

   Every account, number, and label below is INVENTED for demonstration.
   No real client, employee, or financial data appears here. This same fictional
   portfolio is threaded through every interactive dashboard on the site so the
   widgets read as one coherent operating system rather than disconnected mockups.

   12 weeks of weekly series, Monday-dated, starting 2026-01-05. The "month" view
   groups weeks into 4-week periods (labelled by the month each period opens in).
*/
(function () {
  "use strict";

  var weekLabels = [
    "01/05", "01/12", "01/19", "01/26",
    "02/02", "02/09", "02/16", "02/23",
    "03/02", "03/09", "03/16", "03/23"
  ];

  // Each 4-week block rolls up into one "month" period.
  var monthLabels = ["Jan '26", "Feb '26", "Mar '26"];

  var metricsMeta = [
    { key: "volume",       label: "Contact volume",           unit: "",  format: "int",      agg: "sum",   higherIsBetter: null },
    { key: "serviceLevel", label: "Service level",            unit: "%", format: "pct",      agg: "wmean", higherIsBetter: true },
    { key: "aht",          label: "Avg handle time",          unit: "",  format: "duration", agg: "wmean", higherIsBetter: false },
    { key: "csat",         label: "CSAT",                     unit: "%", format: "pct",      agg: "wmean", higherIsBetter: true },
    { key: "abandon",      label: "Abandon rate",             unit: "%", format: "pct1",     agg: "wmean", higherIsBetter: false },
    { key: "fcr",          label: "First-contact resolution", unit: "%", format: "pct",      agg: "wmean", higherIsBetter: true }
  ];

  var accounts = [
    {
      id: "meridian",
      name: "Meridian Health",
      vertical: "Healthcare provider",
      source: "Zendesk",
      rate: 26,
      hours:        [340, 348, 336, 356, 362, 350, 342, 358, 366, 372, 360, 380],
      metrics: {
        volume:       [2450, 2510, 2380, 2620, 2705, 2590, 2480, 2660, 2740, 2810, 2695, 2900],
        serviceLevel: [88, 90, 86, 89, 91, 87, 85, 88, 90, 92, 89, 91],
        aht:          [412, 405, 420, 398, 402, 410, 415, 400, 395, 390, 398, 388],
        csat:         [91, 92, 90, 92, 93, 91, 90, 92, 93, 94, 92, 93],
        abandon:      [4.2, 3.8, 4.6, 3.9, 3.5, 4.1, 4.4, 3.7, 3.4, 3.1, 3.6, 3.2],
        fcr:          [79, 80, 78, 81, 82, 80, 79, 81, 83, 84, 82, 83]
      }
    },
    {
      id: "cascade",
      name: "Cascade Wager",
      vertical: "Sportsbook / wagering",
      source: "Five9",
      rate: 24,
      hours:        [240, 430, 232, 258, 512, 262, 246, 458, 252, 266, 548, 280],
      metrics: {
        volume:       [1820, 3450, 1760, 1980, 4120, 2010, 1890, 3680, 1940, 2050, 4400, 2160],
        serviceLevel: [84, 79, 86, 85, 78, 85, 87, 80, 86, 85, 77, 84],
        aht:          [305, 322, 300, 308, 330, 302, 298, 325, 301, 306, 335, 304],
        csat:         [88, 85, 89, 88, 84, 89, 90, 85, 89, 88, 83, 88],
        abandon:      [5.1, 8.2, 4.6, 4.9, 9.1, 4.7, 4.3, 7.8, 4.5, 4.8, 9.6, 5.0],
        fcr:          [74, 70, 75, 74, 69, 75, 76, 71, 75, 74, 68, 74]
      }
    },
    {
      id: "brightline",
      name: "Brightline Sales",
      vertical: "Outbound sales",
      source: "Salesforce",
      rate: 28,
      hours:        [300, 312, 322, 330, 320, 336, 352, 346, 360, 370, 364, 384],
      metrics: {
        volume:       [1450, 1520, 1580, 1610, 1560, 1640, 1720, 1690, 1760, 1810, 1780, 1880],
        serviceLevel: [90, 91, 89, 92, 90, 91, 93, 92, 93, 94, 92, 94],
        aht:          [512, 505, 520, 498, 508, 500, 492, 496, 488, 484, 490, 480],
        csat:         [89, 90, 88, 91, 90, 91, 92, 91, 92, 93, 91, 93],
        abandon:      [3.4, 3.1, 3.6, 2.9, 3.2, 3.0, 2.6, 2.8, 2.5, 2.3, 2.7, 2.2],
        fcr:          [71, 72, 70, 73, 72, 73, 75, 74, 75, 76, 74, 77]
      }
    },
    {
      id: "harbor",
      name: "Harbor Care",
      vertical: "Customer support",
      source: "Zendesk",
      rate: 23,
      hours:        [420, 438, 405, 450, 460, 428, 414, 452, 468, 478, 458, 496],
      metrics: {
        volume:       [3120, 3260, 3010, 3340, 3420, 3180, 3080, 3360, 3480, 3560, 3400, 3680],
        serviceLevel: [82, 84, 80, 85, 86, 83, 81, 85, 87, 88, 85, 88],
        aht:          [358, 350, 366, 344, 348, 356, 360, 346, 340, 336, 344, 332],
        csat:         [87, 88, 86, 89, 90, 88, 87, 89, 90, 91, 89, 91],
        abandon:      [6.1, 5.6, 6.8, 5.2, 4.9, 5.8, 6.3, 5.1, 4.6, 4.3, 5.0, 4.1],
        fcr:          [76, 77, 75, 78, 79, 77, 76, 78, 80, 81, 79, 81]
      }
    },
    {
      id: "beacon",
      name: "Beacon Onboarding",
      vertical: "Telephony onboarding",
      source: "Dialpad",
      rate: 30,
      hours:        [180, 190, 174, 198, 206, 194, 185, 202, 214, 222, 209, 232],
      metrics: {
        volume:       [640, 680, 620, 710, 735, 690, 660, 720, 760, 790, 745, 820],
        serviceLevel: [93, 94, 92, 95, 95, 93, 92, 94, 95, 96, 94, 96],
        aht:          [720, 705, 735, 690, 698, 712, 725, 700, 688, 680, 695, 675],
        csat:         [93, 94, 92, 95, 95, 94, 93, 95, 96, 96, 95, 96],
        abandon:      [2.6, 2.3, 2.9, 2.1, 2.0, 2.4, 2.7, 2.2, 1.9, 1.7, 2.1, 1.6],
        fcr:          [82, 83, 81, 84, 85, 83, 82, 84, 86, 87, 85, 87]
      }
    },
    {
      id: "northstar",
      name: "Northstar Retail",
      vertical: "Retail support",
      source: "Five9",
      rate: 22,
      hours:        [360, 342, 318, 294, 272, 266, 288, 318, 352, 388, 420, 466],
      metrics: {
        volume:       [2680, 2540, 2360, 2180, 2020, 1980, 2140, 2360, 2620, 2880, 3120, 3460],
        serviceLevel: [86, 85, 83, 82, 80, 81, 83, 85, 86, 87, 85, 84],
        aht:          [372, 378, 386, 392, 398, 395, 388, 380, 374, 368, 372, 380],
        csat:         [88, 87, 86, 85, 84, 85, 86, 88, 89, 89, 88, 87],
        abandon:      [4.8, 5.3, 6.1, 6.8, 7.4, 7.1, 6.2, 5.4, 4.7, 4.2, 5.1, 5.6],
        fcr:          [75, 74, 72, 71, 70, 71, 73, 75, 76, 77, 75, 74]
      }
    }
  ];

  window.KC_PORTFOLIO = {
    synthetic: true,
    weekLabels: weekLabels,
    monthLabels: monthLabels,
    weeksPerMonth: 4,
    metricsMeta: metricsMeta,
    accounts: accounts
  };
})();
