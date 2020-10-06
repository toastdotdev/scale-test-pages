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
  await Promise.all(
    new Array(10001)
      .fill(undefined)
      .map((_, i) =>
        fs.writeFile(`./src/pages/page-${i}.js`, template(i), "utf-8")
      )
  );
}
