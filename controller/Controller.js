// import
import Product__Model from '../model/Product_Model.js'
import User__Model from '../model/User Model.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
class Controller {



    // controller for creating the user

    static createaccount = async (req, res) => {
        try {
            console.log(req.body)
            //    getting data from user
            const { name, email, password } = req.body

            // checking if user is enter all filed or not
            if (!(name && email && password)) {
                console.log('fill all the ')
                res.send("Enter all the fields")
                //    const insert =  User__Model.create()
            } //  
            else {
                //    check if email already exist in database or not
                const user = await User__Model.findOne({ email })
                if (user) {
                    res.send('Email already exist')
                }
                else {
                    const insert = new User__Model({
                        name,
                        email,
                        password
                    })
                    if (await insert.save()) {
                        res.status(200).send('Congratulation account created')
                    }
                }

            }

        }
        catch (error) {
            console.log(error)
        }
    }


    //product api
    static products = async (req, res) => {
        const allproducts = await Product__Model.find()
        res.send(allproducts)
    }


    // functin for login 

    static login = async (req, res) => {
        try {
            const { email, password } = req.body
            // check the fileds
            if (!(email && password)) {
                res.send("Enter all the fields")
            }
            else {

                // check if email exist or not with password
                const user = await User__Model.findOne(
                    {
                        email,
                        password
                    })

                if (user) {
                    res.send(user)
                }
                else {
                    res.send('No email account with this email')
                }

            }
            // check the email exist or not

        } catch (error) {
            console.log(error)
        }



    }

    // selling the products

    static Sell = async (req, res, next) => {
        try {
            // getting the data from user

            console.log(req.body)

            const upload = await new Product__Model({
                name: req.body.name,
                price: req.body.price,
                // 
                categories: req.body.categories,
                district: req.body.district,
                ward: req.body.ward,
                images: req.file.filename,

                description: req.body.description,
                // date: Date.now(),
                // images: [
                //     { first_img: String },
                //     { second_img: String },
                //     { third_imag: String },
                //     { forth_img: String },
                //     { fifth_img: String },
                //     { sixth_img: String },
                //     { seventh_img: String },
                //     { eigth_img: String },
                //     { ninth_img: String }
                // ],

                email: req.body.email
            })
            const save = await upload.save()
            if (save) {
                console.log('uploaded')
            }
            else {
                console.log("not uploaded")
            }
        } catch (error) {
            console.log(error)
        }
        // console.log(req.file)
        // console.log("no")
    }


    // chekcing the user is logged with right account or not
    static login_user = async (req, res) => {
        try {
            const email = req.body.email
            const check = await User__Model.findOne({ email })
            console.log(check)
            if (check) {
                res.send(true)
            }
            else {
                res.send(false)
            }
        } catch (error) {

        }
    }
    // get details of the products based on id
    static getDetails = async (req, res) => {
        try {
            const result = await Product__Model.find({ _id: req.params.id })
            res.send(result)
        }

        catch (error) {
        }
    }
    // getting the user info seller 
    static getuser = async (req, response) => {
        try {
            const seller = await User__Model.find({ email: req.params.email })
            if (seller) {
                response.send(seller)
                console.log('seller')
            }
            else {
                response.send('Not found')
            }
            response.send('Not found')

        } catch (error) {

        }
    }

}


export default Controller