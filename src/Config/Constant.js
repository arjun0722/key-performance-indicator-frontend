export const API_END_POINTS = {
  PRODUCT_TYPES: "/api/product/get/type",
  PRODUCT_FILTERS: "/api/product/filters",
  BASE_URL: "https://dev.azure.com/qservicesindia",
};

export const ACCESS_TOKEN = {
  TOKEN: "token-data",
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
  APP_ID: "9B40F6C8-40E8-4BCC-A593-552D8E37A1D8",

  RESPONSE_TYPE: "Assertion",

  STATE: "User1",

  SCOPE:
    "vso.analytics vso.auditstreams_manage vso.build_execute vso.code_full vso.code_status vso.connected_server vso.dashboards_manage vso.entitlements vso.environment_manage vso.extension.data_write vso.extension_manage vso.gallery_acquire vso.gallery_manage vso.graph_manage vso.identity_manage vso.loadtest_write vso.machinegroup_manage vso.memberentitlementmanagement_write vso.notification_diagnostics vso.notification_manage vso.packaging_manage vso.pipelineresources_manage vso.profile_write vso.project_manage vso.release_manage vso.securefiles_manage vso.security_manage vso.serviceendpoint_manage vso.symbols_manage vso.taskgroups_manage vso.test_write vso.threads_full vso.tokenadministration vso.tokens vso.variablegroups_manage vso.wiki_write vso.work_full",

  REDIRECT_URI: "https://devops.qservicesit.com/login",

  CLIENT_SCREAT:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJjaWQiOiI5YjQwZjZjOC00MGU4LTRiY2MtYTU5My01NTJkOGUzN2ExZDgiLCJjc2kiOiJhZjVmZmNiNC0zNDIyLTRhZDgtOWFiMC03YTc0MTZlZjgzNmIiLCJuYW1laWQiOiJkOTE1ZTE4MC1lOWVmLTZmYjMtYmM0ZC0zMjQwZmExMmU1YzEiLCJpc3MiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTY3NTQ0MjQ4NSwiZXhwIjoxODMzMjA4ODg1fQ.jbvM0tbc8KZpMLWo40-w18C45xOCyyK6mgIxjZ97LGFlBeQAshT4D6AWl0uEoX7o4FmRISB5A0I2xHrN1a4Dr9s7IEO2AoxyucvGQ_VRDyq1fqkBb-0d7aEt9X1KEHAbzj_7FLbD3mVh4pnMVp9uKcjnuFNACvdEAeWSUW23DfHFOhLiNleGzAMfmsC47qv6oWpImKBnVou2hx6GkmSS-6rrQP-8t3I5WlhY40Rz762Ydmj4NV2eGcyG2sr9gJR0vhT5dw-agpo56ty0aKWITD_dDFaWxTAdj1Y-vtg2gv5mFuQUa28ubTmwnZ1jPZRnQt_l0BJO51_sXGYNh3vwlA",
};
// export const LOGIN_KEYS_ = {
//   APP_ID: "30C077BB-196D-4B0C-90DE-6D4F0692664B",
//   RESPONSE_TYPE: "Assertion",
//   STATE: "User1",
//   SCOPE:
//     "vso.auditlog vso.auditstreams_delete vso.build_execute vso.code_manage vso.dashboards_manage vso.environment_manage vso.extension.data_write vso.extension_manage vso.gallery_manage vso.graph_manage vso.identity_manage vso.loadtest_write vso.memberentitlementmanagement_write vso.notification_diagnostics vso.notification_manage vso.packaging_manage vso.profile_write vso.project_manage vso.release_manage vso.securefiles_manage vso.serviceendpoint_manage vso.symbols_manage vso.taskgroups_manage vso.test_write vso.tokenadministration vso.tokens vso.variablegroups_manage vso.wiki_write vso.work_full",
//     REDIRECT_URI: "https://task.speedo.delivery/login",

//   CLIENT_SCREAT:
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJjaWQiOiIzMGMwNzdiYi0xOTZkLTRiMGMtOTBkZS02ZDRmMDY5MjY2NGIiLCJjc2kiOiIwZjBmNDYyOS1hYmMxLTRmMzgtYjFjYi1kMjMxOWYzNWVlOGMiLCJuYW1laWQiOiJiNGE0NWE3MS1iNzMyLTQ5NzgtYjE5ZS0yMDQ4NDlmOTUyYjAiLCJpc3MiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTY0MDY3MTcyNSwiZXhwIjoxNzk4NDM4MTI1fQ.M_Q1XKC707IsHValhylt_FxC2bBTFy6s1-quXHYokZVF26ctnQ-SaSvwydZYR8qsxkuS8pLMEmRoWuHtuKoHd-VR9mgTmop5aebX1RDUDWNPPSLlbd5EOLNcuLdOz8h5VgJflXpnXZeagLdgcioLo-gL515l_ZYItLUgFTMyB3Wk6s16MpPn3y5SEBnOiAcCl5awYMip1DYhGVJ8EMnio3L1x1bcqcqA11DWb0L1FNc8_EnO78Ly7ggSQud20C3rQ9UREt6jjz_EBmaxzZLSL9kKewSOD34DwJaIR5d-8E13fpAVEI9WAolrQMRwKINH3YzmRJTylxRFUTCVumkyNw",
// };
export const LOGIN_KEYS_ = {
  APP_ID: "250CEECC-F08B-428F-A591-0914A93C4353",
  RESPONSE_TYPE: "Assertion",

  STATE: "User1",

  SCOPE:
    "vso.auditlog vso.auditstreams_delete vso.build_execute vso.code_manage vso.dashboards_manage vso.environment_manage vso.extension.data_write vso.extension_manage vso.gallery_manage vso.graph_manage vso.identity_manage vso.loadtest_write vso.memberentitlementmanagement_write vso.notification_diagnostics vso.notification_manage vso.packaging_manage vso.profile_write vso.project_manage vso.release_manage vso.securefiles_manage vso.serviceendpoint_manage vso.symbols_manage vso.taskgroups_manage vso.test_write vso.tokenadministration vso.tokens vso.variablegroups_manage vso.wiki_write vso.work_full",
  REDIRECT_URI: "https://devops.qservicesit.com/login",

  CLIENT_SCREAT:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJjaWQiOiIyNTBjZWVjYy1mMDhiLTQyOGYtYTU5MS0wOTE0YTkzYzQzNTMiLCJjc2kiOiJlYWE4YzY4ZC1jNTAzLTQyNTItYTRjYy0wZjA1MDIwYjRmZDEiLCJuYW1laWQiOiJkOTE1ZTE4MC1lOWVmLTZmYjMtYmM0ZC0zMjQwZmExMmU1YzEiLCJpc3MiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTY1OTMzNDk4NCwiZXhwIjoxODE3MTAxMzg0fQ.EOdZZPcKiQqbmi6gSFBxgX98574eGRKkCBuZKMrYjLV2thA5J0-072bYoB2mMGMdZrg-wnKf31--Nr8b9vkJAH0YDsXFYqI3m_jvvozVcT_RX_6VOm1I69-hcxgXO2VGwdn7cfLVet-R3Pn9_Wayp4ZnYk7F-LTgp6xDc8rPrWEpGi8DF4_7Oz5Wq2JX4OHo47lmDZsg6395cg6X0V5k3E4xdO8EYvp4W6sQJ2mWL0_BhhacV1brycSHqKMvrRq22ewHeFMxvj3OnfgfBObtr7gzZrqBMwsvR6GFhe7L9ra6vwfMnl-_D6zM5Zb1GK2T6QGI8xB9Qp-ZQaQUXws9ew",
};