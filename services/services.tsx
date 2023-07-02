import { myAxios } from "@/services/helper";

export const pokemon = () => {
    return myAxios.get("/pokemon").then((res) => {
        console.log(res.data);
        return res.data;
    })
}