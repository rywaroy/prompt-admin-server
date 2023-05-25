const { GroupModel } = require('../model');

exports.createGroup = async (req, res) => {
    const { parentId, name, orderIndex } = req.body;
    const group = await GroupModel.create({
        parentId,
        name,
        orderIndex,
    });
    res.success(group);
};

exports.updateGroup = async (req, res) => {
    const { id } = req.params;
    const { parentId, name, orderIndex } = req.body;
    const group = await GroupModel.findByPk(id);
    if (!group) {
        res.error('404', 'group not found');
        return;
    }
    await group.update({
        parentId,
        name,
        orderIndex,
    });
    res.success(group);
};

exports.deleteGroup = async (req, res) => {
    const { id } = req.params;
    const group = await GroupModel.findByPk(id);
    if (!group) {
        res.error('404', 'group not found');
        return;
    }
    const children = await GroupModel.findAll({
        where: {
            parentId: id,
        },
    });
    if (children.length > 0) {
        res.error('400', 'group has children');
        return;
    }
    const prompts = await group.getPrompts();
    for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i];
        const fragments = await prompt.getFragments();
        for (let j = 0; j < fragments.length; j++) {
            const fragment = fragments[j];
            await fragment.destroy();
        }
        await prompt.destroy();
    }
    await group.destroy();
    res.success();
};

function buildTree(arr) {
    const tree = [];
    const childrenOf = {};

    arr.forEach((item) => {
        const { id, parentId } = item;
        childrenOf[id] = childrenOf[id] || [];
        item.children = childrenOf[id];
        if (parentId === null) {
            tree.push(item);
        } else {
            childrenOf[parentId] = childrenOf[parentId] || [];
            childrenOf[parentId].push(item);
        }
    });

    arr.forEach((item) => {
        if (!item.children || !item.children.length) {
            delete item.children;
        }
    });

    return tree;
}

exports.getGroup = async (req, res) => {
    const group = await GroupModel.findAll({ toJSON: { virtuals: true } });
    const data = group.map((item) => {
        const g = item.get({ plain: true });
        return g;
    });

    const tree = buildTree(data);
    res.success(tree);
};
