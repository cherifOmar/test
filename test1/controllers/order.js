import orders from '../models/order.js';




export  function addOnceOrder (req, res){


            orders.create({
            status: req.body.status,

          })
            .then((newProduct) => {
              
              res.status(200).json({
                status: newProduct.status,
              

              });
            })
            .catch((err) => {
              res.status(404).json({ error: err });
            });
        
      }
  




export async function DeleteOrder(req, res) {
  const id =req.params.id
  const order = await orders.findByIdAndDelete(id);
  res.status(200).json({"message":"deleted"});
}

export function getOrderById(req, res){
  orders.findById(req.params.id)
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
        status: req.body.status,

      }
    }
    else {
      newProduct = {

        status: req.body.status,
      }
    }
  orders.findByIdAndUpdate(req.params.id, newProduct)
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




export function getAllOrders(req, res) {
              console.log(req.params.vendorId)
            
              orders
                .find({})
            
                .then(docs => {
                  // console.log(req.params.vendorId)
                  res.status(200).json(docs);
                })
                .catch(err => {
                  res.status(500).json({ error: err });
                });
            }

// export function createOrders(req,res){
//   console.log(req.body)
//   commande
//     .create({
//       items:req.body,
//       clientId:req.body.clientId,
//       total:req.body.total,
//     })
//     .then(docs => {
//       return res.status(200).json(req.body)
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });
// }