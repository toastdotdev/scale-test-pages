import { promises as fs } from "fs";

const template = (n) => `import { h, Fragment } from "preact";

export default (props) => (
  <div>
    <h1>Page Number (attempt 3) ${n}</h1>
  </div>
);
`;

main();

async function main() {
  const PAGE_QUANTITY = process.env.PAGE_QUANTITY || 10000;
  const INCREMENT =
    PAGE_QUANTITY *
    (PAGE_QUANTITY * 0.5 < 20000
      ? 0.5
      : PAGE_QUANTITY * 0.25 < 20000
      ? 0.25
      : 0.125);

  for (let n = 0; n < PAGE_QUANTITY; n += INCREMENT) {
    console.log(n);
    await Promise.all(
      new Array(INCREMENT + 1)
        .fill(undefined)
        .map((_, i) =>
          fs.writeFile(`./src/pages/page-${i + n}.js`, template(i + n), "utf-8")
        )
    );
  }
  console.log(PAGE_QUANTITY);
}
