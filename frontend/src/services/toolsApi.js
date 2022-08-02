export default class toolsApi {
    static tools = []
    static tool_query={}
    static async getTools() {
        const requestOptions = {
            method: "GET",

        };
        const response = await fetch(process.env.REACT_APP_BACKEND + "/api/tools", requestOptions);
        let data = await response.json();
        if (response.status !== 200) {
            return []
        }
    
        return data;
    }
    static async addtool(query) {
        let localuser = JSON.parse(localStorage.getItem("user")) ?? { username: '', user_type: "", token: "", auth: false }
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json", "token": localuser.token },
            body: JSON.stringify(query),
        };
        const response = await fetch(process.env.REACT_APP_BACKEND + "/api/tool", requestOptions);
        const data = await response.json();
        if (response.status === 200) {
            return {data,success:true}
        }
        return { message:data.message,success:false }

    }
    static async runTool(data, tool_enum) {
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const response = await fetch(process.env.REACT_APP_BACKEND + `/api/tool/run/${tool_enum}`, requestOptions);
        let res = await response.json();
        if (response.status === 200) {
            return {result:res,success:true}
        }
        return { message: "error on request",success:false }
    }

    static async restartTool({ tool_enum }) {
        let localuser = JSON.parse(localStorage.getItem("user")) ?? { username: '', user_type: "", token: "", auth: false }
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json", "token": localuser.token }
        };
        const res = await fetch(process.env.REACT_APP_BACKEND + `/api/tool/restart/${tool_enum}`, requestOptions);
        let response = await res.json();
        if (res.status === 200) {
            return {result:response,success:true}
        }
        return { message: "error on request",success:false }
    }

    static async listEditableTools() {
        let localuser = JSON.parse(localStorage.getItem("user")) ?? { username: '', user_type: "", token: "", auth: false }
        const requestOptions = {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json", "token": localuser.token }
        };
        const res = await fetch(process.env.REACT_APP_BACKEND + `/api/tools/editable`, requestOptions);
        let response = await res.json();
        if (res.status === 200) {
            return {result:response,success:true}
        }
        return { message: "error on request",success:false }

    }


}