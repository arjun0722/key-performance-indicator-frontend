export const API_END_POINTS = {
  PRODUCT_TYPES: "/api/product/get/type",
  PRODUCT_FILTERS: "/api/product/filters",
  BASE_URL: "https://dev.azure.com/qservicesindia",
};

export const ACCESS_TOKEN = {
  TOKEN: "token-data",
  USER_EMAIL: "user_email",
};

export const ERROR = {
  COMMENT_ERROR: "Opps.. There are no comments for this task",
  PERMISSION_ERROR:
    "Either You Donot Have Permission or There is No Task For This User",
  GENERAL_ERROR: "Oops...something went wrong",
};

export const SORTING_ID = {
  A_Z_PRODUCT_NAME: "1",
  Z_A_PRODUCT_NAME: "2",
  A_Z_PRODUCT_TYPE: "3",
  Z_A_PRODUCT_TYPE: "4",
};
export const STATUS = {
  In_ACTIVE_STATUS: "0",
  ACTIVE_STATUS: "1",
};
export const LOGIN_KEYS = {
  APP_ID: "861DAABE-EE6C-4495-9597-AB62DDE5E839",
  RESPONSE_TYPE: "Assertion",
  STATE: "User1",
  SCOPE:
    "vso.auditlog vso.auditstreams_delete vso.build_execute vso.code_full vso.dashboards_manage vso.environment_manage vso.gallery_publish vso.graph_manage vso.identity_manage vso.memberentitlementmanagement_write vso.notification_manage vso.packaging_manage vso.profile_write vso.project_manage vso.release_manage vso.securefiles_manage vso.serviceendpoint_manage vso.symbols_manage vso.taskgroups_manage vso.tokenadministration vso.tokens vso.variablegroups_manage vso.wiki_write vso.work_full",
  REDIRECT_URI: "https://localhost:3000/login",

  CLIENT_SCREAT:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJjaWQiOiI4NjFkYWFiZS1lZTZjLTQ0OTUtOTU5Ny1hYjYyZGRlNWU4MzkiLCJjc2kiOiI2YTAyMTExOS00OTE1LTQ3OGItODYwOC01N2NjYzAzZjZiOTUiLCJuYW1laWQiOiJiNGE0NWE3MS1iNzMyLTQ5NzgtYjE5ZS0yMDQ4NDlmOTUyYjAiLCJpc3MiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTY0MDY4NDEwMCwiZXhwIjoxNzk4NDUwNTAwfQ.HnbolRXv-F6xsIBda2BNSBDxhJ2QYTU_PFZh5vwdoyloKZNRR4Z2oIsLqF9NnqR50_IedDsrgNZXj_P8CNkfTePdIiNoQG4egh7PygaZ-2aj1oyoPz62RcjcihqOmqECIuja_Mo7OLuKY6W0S3xBiTmf92l3R7cDIBKH8JOM8oxleKip35lOy_I1KHjxIdxIydCNd04PNrsQT0Yr4MsN3G6hbfHU02ZgD1gB7_ZKmZj6Kt8elUPfiF0mnXASQ7Mld2-G1By-f9Y6U9LOtkPGUsSJ8karkr46IlXGjr6hSJMbu-dvXjNkqGFaGbyn6W1g_DY--8gpZOVyuNtFVXavGQ",
};
export const LOGIN_KEYS_ = {
  APP_ID: "30C077BB-196D-4B0C-90DE-6D4F0692664B",
  RESPONSE_TYPE: "Assertion",
  STATE: "User1",
  SCOPE:
    "vso.auditlog vso.auditstreams_delete vso.build_execute vso.code_manage vso.dashboards_manage vso.environment_manage vso.extension.data_write vso.extension_manage vso.gallery_manage vso.graph_manage vso.identity_manage vso.loadtest_write vso.memberentitlementmanagement_write vso.notification_diagnostics vso.notification_manage vso.packaging_manage vso.profile_write vso.project_manage vso.release_manage vso.securefiles_manage vso.serviceendpoint_manage vso.symbols_manage vso.taskgroups_manage vso.test_write vso.tokenadministration vso.tokens vso.variablegroups_manage vso.wiki_write vso.work_full",
  REDIRECT_URI: "https://task.speedo.delivery/login",

  CLIENT_SCREAT:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJjaWQiOiIzMGMwNzdiYi0xOTZkLTRiMGMtOTBkZS02ZDRmMDY5MjY2NGIiLCJjc2kiOiIwZjBmNDYyOS1hYmMxLTRmMzgtYjFjYi1kMjMxOWYzNWVlOGMiLCJuYW1laWQiOiJiNGE0NWE3MS1iNzMyLTQ5NzgtYjE5ZS0yMDQ4NDlmOTUyYjAiLCJpc3MiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTY0MDY3MTcyNSwiZXhwIjoxNzk4NDM4MTI1fQ.M_Q1XKC707IsHValhylt_FxC2bBTFy6s1-quXHYokZVF26ctnQ-SaSvwydZYR8qsxkuS8pLMEmRoWuHtuKoHd-VR9mgTmop5aebX1RDUDWNPPSLlbd5EOLNcuLdOz8h5VgJflXpnXZeagLdgcioLo-gL515l_ZYItLUgFTMyB3Wk6s16MpPn3y5SEBnOiAcCl5awYMip1DYhGVJ8EMnio3L1x1bcqcqA11DWb0L1FNc8_EnO78Ly7ggSQud20C3rQ9UREt6jjz_EBmaxzZLSL9kKewSOD34DwJaIR5d-8E13fpAVEI9WAolrQMRwKINH3YzmRJTylxRFUTCVumkyNw",
};
