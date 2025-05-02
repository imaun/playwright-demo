document.addEventListener('DOMContentLoaded', () => {
    const priceCategory = document.getElementById('priceCategory');
    const itemCode = document.getElementById('itemCode');
    const adjustmentFactor = document.getElementById('adjustmentFactor');

    priceCategory.addEventListener('change', () => {
        if (priceCategory.value === 'basic') {
            itemCode.value = 'B100';
            adjustmentFactor.value = 1.0;
        } else if (priceCategory.value === 'premium') {
            itemCode.value = 'P200';
            adjustmentFactor.value = 1.5;
        } else {
            itemCode.value = '';
            adjustmentFactor.value = '';
        }
    });

    adjustmentFactor.addEventListener('input', () => {
        const factor = parseFloat(adjustmentFactor.value);
        if (!isNaN(factor) && factor > 2.0) {
            itemCode.value = 'HIGH';
        }
    });
});