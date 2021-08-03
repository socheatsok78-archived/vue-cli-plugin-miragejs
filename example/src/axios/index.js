import axios from "axios";
import { MirageMockAdapter } from './adapters/MirageMockAdapter'

export const api = axios.create({
  adapter: MirageMockAdapter(axios.defaults.adapter)
})
