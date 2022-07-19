

export default {
  "/api/*":{
    target:"http://localhost:9000/",
    changeOrigin:true
  }
};