
export default {
    getCategory: async () => {
        const req = await fetch('https://api.b7web.com.br/devsfood/api/categories');
        const res = await req.json();
        return res
    },
    getProducts: async (category:number, page:number, search:string) => {
      
        
        let fields:any = {};
        if(category >= 0){
            fields.category = category;
        }
        if(page > 0 ){
            fields.page = page;

        }
        if(search != ''){
            fields.search = search
        }

        let queryString = new URLSearchParams(fields).toString();
      
        const req = await fetch('https://api.b7web.com.br/devsfood/api/products?'+queryString);
        const json = await req.json();
        return json
    }
}