import Products from '../models/Product.js';
import commande from '../models/commande.js';
import Commandes from '../models/commande.js';
import nodemailer from 'nodemailer';

import { validationResult } from "express-validator";


export  function addOnceProduct (req, res){


            Products.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            description: req.body.description,
            status: req.body.status,
            ownedBy: req.params.vendorId,
            image: `${req.file.filename}`
          })
          .then((newProduct) => {
            // Envoi de la réponse JSON après la création du produit
            res.status(200).json({
              name: newProduct.name,
              price: newProduct.price,
              quantity: newProduct.quantity,
              category: newProduct.category,
              description: newProduct.description,
              status: newProduct.status,
            });
      
            const transporter = nodemailer.createTransport({
              // Configuration du service d'envoi d'e-mails (par exemple, Gmail)
              service: 'gmail',
              auth: {
                user: 'comar2866@gmail.com',
                pass: 'omar omar',
              },
              tls: {
                rejectUnauthorized: false,
              },
            });
      
            const mailOptions = {
              from: 'comar2866@gmail.com',
              to: 'comar2866@gmail.com',
              subject: 'New Product Publication',
              html: `
                <p>Hello Admin,</p>
                <p>A new product has been published:</p>
                <p>Product Name: ${newProduct.name}</p>
                <p>Product Category: ${newProduct.category}</p>
                <p>Please confirm the product publication by clicking on the following link:</p>
                <p>http://localhost:9090/user/confirm-product/${newProduct._id}</p>
              `,
            };
      
            console.log("Sending confirmation email");
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Error sending email:", error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err }); // Utilisez le code 500 pour une erreur interne du serveur
          });
      }
  


export function getAll(req, res) {
  console.log(req.params.vendorId)

  Products
    .find({ownedBy: req.params.vendorId})

    .then(docs => {
      // console.log(req.params.vendorId)
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export async function Deleteproduct(req, res) {
  const id =req.params.id
  const product = await Products.findByIdAndDelete(id);
  res.status(200).json({"message":"deleted"});
}

export function getProductById(req, res){
  Products.findById(req.params.id)
          .then((doc) => {
            res.status(200).json(doc);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


export function putOnce(req, res) {
  let newProduct = {};
    if(req.file == undefined) {
      newProduct = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        description: req.body.description,
        status: req.body.status,
        image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
      }
    }
    else {
      newProduct = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        description: req.body.description,
        status: req.body.status,
        // image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
      }
    }
  Products.findByIdAndUpdate(req.params.id, newProduct)
    .then((doc1) => {
      Products.findById(req.params.id)
        .then((doc2) => {
            res.status(200).json(doc2);
              })
        .catch((err) => {
            res.status(500).json({ error: err });
              });
          })
      .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


export function getProductCategories(req, res){
        Products.distinct('category')
          .then((categories) => {
            res.json(categories);
            // console.log(categories)
          })
          .catch((err) => console.log(err));
            }

export function getAllProducts(req, res) {
              console.log(req.params.vendorId)
            
              Products
                .find({})
            
                .then(docs => {
                  // console.log(req.params.vendorId)
                  res.status(200).json(docs);
                })
                .catch(err => {
                  res.status(500).json({ error: err });
                });
            }

export function createOrders(req,res){
  console.log(req.body)
  commande
    .create({
      items:req.body,
      clientId:"eeeeeeeeeeeee",
      total:12
    })
    .then(docs => {
      return res.status(200).json(req.body)
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}



export function getProductByVendor(req, res)  {
	const ownedBy = req.params.vendorId;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Products.find({
		ownedBy,
	})
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((products) => {
			res.json(products);
		})
		.catch((err) => console.log(err));
};