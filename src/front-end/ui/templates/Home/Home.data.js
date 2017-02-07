import fs from 'fs'

const summaryText = fs.readFileSync(
  __dirname + '/../../../../../../../content/homepage/summary.md'
)
const extendedSummaryText = fs.readFileSync(
  __dirname + '/../../../../../../../content/homepage/extended-summary.md'
)

export default {
  page: {
    summary: summaryText.toString(),
    extendedSummary: extendedSummaryText.toString(),
  },
}
