import SDC from "statsd-client";
// import SDC from "node-statsd";

let statsd_client = new SDC({
  host: "localhost",
  port: 8125,
});

export { statsd_client };
// import SDC from "hot-shots";
// // import SDC from "node-statsd";

// let statsd_client = new SDC({
// //   host: "localhost",
//   port: 8125,
// });

// export { statsd_client };