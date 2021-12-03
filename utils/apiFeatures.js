const apiFeatures = class apiFeatures {
    query
    queryStr

    constructor(query, querystr){
        this.query = query
        this.queryStr = querystr
    }

    sort() {
        if(this.queryStr.sort){
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    pagination() {
        if(this.queryStr.page){
            this.query = this.query.limit(3).skip((this.queryStr.page - 1) * 3)
        }
        return this
    }
}

export default apiFeatures