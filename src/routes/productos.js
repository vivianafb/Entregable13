import express, { urlencoded } from 'express';
import session from 'express-session';
const router = express.Router();

let productos = [
    {
      id: 1,
      nombre: 'Escuadra',
      precio: 200,
      foto: 'https://media.istockphoto.com/photos/wooden-ruler-picture-id186824125?s=612x612'
    },
    {
      id: 2,
      nombre: 'Transportador',
      precio: 50,
      foto: 'https://images.pexels.com/photos/5905610/pexels-photo-5905610.jpeg?cs=srgb&dl=pexels-katerina-holmes-5905610.jpg&fm=jpg'

    },
];
class Productos{
    listar(data){
       return data;
    }

    listarIndividual(productos,id){
        return productos.find((aProduct) => aProduct.id == id);  
    }

    almacenar(nombre,precio,foto){
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: nombre,
            precio: precio,
            foto: foto
          };
        
          productos.push(nuevoProducto);
          return nuevoProducto;
    }

    actualizar(id,nombre,precio){
        const newArray = productos.map(pro =>{
            if(pro.id === id){
                return{id:id, nombre: nombre,precio: precio}
            }
        });
        return newArray;
      
    }

    borrar(id){
        let productoEliminado = productos.splice(id-1,1);
        return productoEliminado;
    }
}

const myUser = 'vivi';
router.get('/', (req, res) => {
  res.render('inicio')
  console.log(req.cookies)

});
router.get('/login', (req, res) => {

  const  username  = req.query.username;
  // const body = req.body;
  if (username == myUser) {
    req.session.username = username
    req.session.loggedIn = true;
    req.session.contador = 1;
    res.render('main',{username})

  } else res.status(401).json({ msg: 'no estas autorizado' });
});

router.get('/info', (req, res) => {
  res.send({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
});


router.get('/logout', (req, res) => {
  const  username  = req.session.username;
  req.session.destroy();
  if(!req.session) res.render('logout',{username})
  // setTimeout(() => {
  //   res.render('inicio',{username})
  // }, 2000); 
});

const validateLogIn = (req, res, next) => {
  if (req.session.loggedIn) next();
  else res.status(401).json({ msg: 'no estas autorizado' });
};

// router.get('/secret-endpoint', validateLogIn, (req, res) => {
//   req.session.contador++;
//   res.json({
//     msg: 'informacion super secreta',
//     contador: req.session.contador,
//   });
// });

router.get('/vista', (req, res) => {
  let array = new Productos();
  let lista = array.listar(productos);
  if (!lista) {
      res.status = 404;
      return res.json({
          error: 'No hay productos cargados'
      });
  }    
  res.render('main',{lista})
});

router.get('/inicio', (req, res) => {
    res.render('main')
  });

router.get('/listar', (req, res) => {
  let array = new Productos();
  let lista = array.listar(productos);
  if (!lista) {
      res.status = 404;
      return res.json({
          error: 'No hay productos cargados',
      });
  }    
  res.json({
    data: lista,
  });
});

router.get('/:id', (req, res) => {
    let array = new Productos();
    let id = req.params.id;
    let producto = array.listarIndividual(productos,id);

    // if (!producto) {
    //   res.status = 404;
    //   return res.json({
    //     error: 'Producto no encontrado'
    //   });
    // }

    res.json({
      data: producto,
    });
});

router.post('/guardar', (req, res) => {
    let array = new Productos();
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const foto = req.body.foto;
    let producto = array.almacenar(nombre,precio,foto);
    
  res.status = 201;
  res.redirect('/api/productos/vista');
  // res.json({
  //   data: producto,
  // });
});

router.put('/actualizar/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    let array = new Productos();
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    if (id < 1 || id > productos.length) {
        return res.status(400).json({
          error: 'El parámetro está fuera de rango',
        });
      }
    let producto = array.actualizar(id,nombre,precio);

    
    res.json({
        producto,
    });
});

router.delete('/borrar/:id', (req, res) => {
    const id = req.params.id;
    let array = new Productos();
    let producto = array.borrar(id);
    if (id < 1 || id > productos.length+1) {
        return res.status(400).json({
          error: 'El parámetro está fuera de rango',
        });
    }
    
    res.json({
        producto,
    });
});


export default router;