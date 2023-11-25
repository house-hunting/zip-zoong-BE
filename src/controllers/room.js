import Room from "../models/room";
import Address from "../models/address";

exports.uploadImage = (req, res) => {
    res.json({ url: `/img/${req.file.filename}`});
};

exports.uploadAddress = async(req, res) => {
    try {
        const room = await Room.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });
        const rooms = req.body.content.match(/[^\s]*/g);
        if(rooms) {
            const result = await Promise.all(rooms.map((search) => {
                return Address.findOrCreate({
                    where: { dong: search.slice(1).toLowerCase() }
                });
            }));
            console.log(result);
            await room.addAddress(result.map(r => r[0]));
        }
    } catch(error) {
        console.log(error);
        nextPowerTwo(error);
    }
}