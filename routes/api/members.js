const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const members = require('../../members')
//get single memeber
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `no member of the id of ${req.params.id} was found` })
    }

})

//get the json data of members
router.get('/', (req, res) => res.json(members))

//create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: "Plz include a name and email"
        })
    }


    members.push(newMember)
    res.redirect('/');
})

//update members
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        const updateMember = req.body
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name
                member.email = updateMember.email ? updateMember.email : member.email
                res.json({ msg: 'Member updated', member })
            }

        })
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `no member of the id of ${req.params.id} was found` })
    }

})

//delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id)) })
    } else {
        res.status(400).json({ msg: `no member of the id of ${req.params.id} was found` })
    }

})

module.exports = router