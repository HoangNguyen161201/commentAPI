const checkError = (error, req, res, next)=> {
    if(error){
        res.json({
            error
        })
    }
}

export default checkError