import { spawn } from "child_process"
import fs from "fs"
import util from "util"

const exec = ({ command = "", args = [], option = [], log }) =>
  new Promise((resolve, reject) => {
    if (!command || args.length <= 0) {
      console.log()
      console.log()
      reject("参数不全，无法执行spawn命令...")
      process.exit(1)
    }
    log && log(`执行命令：${command}`)
    const child = spawn(command, args, { ...option })
    let rs = ""
    child.stdout &&
      child.stdout.on("data", (msg) => {
        rs += msg
      })
    child.on("error", (err) => {
      reject(err)
    })
    child.on("close", (code) => {
      if (code !== 0) {
        reject("程序执行出错，请重新执行。")
        return
      }
      resolve(rs)
    })
  })

async function isFile(p) {
  try {
    const stat = await util.promisify(fs.stat)(p)
    // 是否是文件
    return !!stat.isFile()
  } catch (err) {
    return false
  }
}

async function isDirectory(p) {
  try {
    const stat = await util.promisify(fs.stat)(p)
    return !!stat.isDirectory()
  } catch (err) {
    return false
  }
}

async function isExist(p) {
  try {
    const stat = await util.promisify(fs.stat)(p)
    return stat.isFile() || stat.isDirectory()
  } catch (err) {
    return false
  }
}

export { exec, isFile, isDirectory, isExist }
