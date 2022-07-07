import { Unit } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class UnitService {
  public static async getAll() {
    return (await axiosInstance.get<Unit[]>("/unit")).data;
  }

  public static async getCadetsInCompany() {
    return (await axiosInstance.get<Unit>("/unit/allCadetsInCompany")).data;
  }

  public static async getCompaniesByGdudId(gdudId: number) {
    return (await axiosInstance.get<Unit[]>(`/unit/companiesByGdud/${gdudId}`))
      .data;
  }
}
