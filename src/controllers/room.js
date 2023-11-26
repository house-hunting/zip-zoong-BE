import Room from "../models/room";
import Address from "../models/address";

exports.afteruploadImage = (req, res) => {
    res.json({ url: `/img/${req.file.filename}`});
};

exports.uploadBoard = async(req, res) => {
    try {
        const room = await Room.create({
            size: req.body.size,
            address: req.body.address,
            pyeong: req.body.peyeong,
            style: req.body.style,
            paied: req.body.paied,
            monthPay: req.body.monthPay,
            deposit: req.body.deposit,
            maintenance: req.body.maintenance,
            moveDate: req.body.moveDate,
            floor: req.body.floor,
            elevator: req.body.elevator,
            parking: req.body.parking,
            options: req.body.options,
            title: req.body.title,
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