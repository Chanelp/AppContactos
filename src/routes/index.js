const { Router } = require('express');

//En routes index necesito la conexión a db
const { db } = require('../firebase')

const router = Router();

//LISTAR LOS DATOS
router.get('/', async (req, res) => {

    const querySnapshot = await db.collection('contacts').get()

    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    console.log(contacts);

    res.render('index', { contacts })
})

//PASO1: CREAR UNA RUTA
router.post('/new-contact', async (req, res) => {

    //Para guardar datos tengo que recibir un objeto

    //TRAIGO LOS DATOS QUE EL FORMULARIO ME ESTÁ ENVIANDO
    const { firstname, lastname, email, phone } = req.body

    //Esta consulta es la que inserta en la base de datos
    //GUARDO EN FIREBASE
    await db.collection('contacts').add({
        firstname,
        lastname,
        email,
        phone
    })

    //DEVUELVO AL CLIENTE EL TEXTO DE NUEVO USUARIO CREADO
    res.redirect('/')
})

router.get('/edit-contact/:id', async (req, res) => {
    const doc = await db.collection('contacts').doc(req.params.id).get();

    res.render('index', { contact: { id: doc.id, ...doc.data() } });
});

router.get('/delete-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).delete()
    res.redirect('/');
})

router.post('/update-contact/:id', async (req, res) => {

    const { id } = req.params

    await db.collection('contacts').doc(id).update(req.body)

    res.redirect('/');
})

module.exports = router;