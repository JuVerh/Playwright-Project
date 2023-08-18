import { FullConfig, Reporter, Suite } from '@playwright/test/reporter'
import * as fs from 'fs'

//Creation custom reporter
class myReporter implements Reporter {
  onBegin(config, suite) {
    //config is not used but need for test running
    console.log(`Starting the run with ${suite.allTests().length} tests`)
  }

  onEnd(result) {
    console.log(`Execution completed with status ${result.status}`)
  }

  onTestBegin(test) {
    console.log(`Execution of ${test.title} started`)
  }

  onTestEnd(test, result) {
    const execTime = result.duration

    const data = {
      test: test.title,
      status: result.status,
      executionTime: execTime,
      errors: result.error,
    }
    const dataToString = JSON.stringify(data, null, 2)
    console.log(dataToString)

    fs.writeFileSync('test-result.json', dataToString)
  }
}

export default myReporter
