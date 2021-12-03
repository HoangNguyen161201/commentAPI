// check error async

const errorAsync = (func)=> {
    return (req, res, next)=> {
        new Promise((resolve, reject)=> {
            resolve(func(req, res, next ))
        }).catch(error=> {
            return next(error)
        })
    }
}

export default errorAsync


