 
        $(document).ready(function () {
            const instance = tippy('.floating-icon', {
                content: 'Hi ! Welcome',
                trigger: 'manual',
                theme: 'custom',
                duration: [1500, 2000],
                arrow: true,
                placement: 'top',
            });
            setTimeout(() => {
                instance[0].show();
            }, 500);
            setTimeout(() => {
                instance[0].hide();
            }, 3000);

            const hoverIcon = () => {
                tippy('.floating-icon', {
                    content: 'How Can I help You !!',
                    theme: 'custom customone',
                    arrow: true,
                    trigger: 'mouseenter',
                    hideOnClick: false,
                    duration: [500, 1000],
                    onShow(instance) {
                        console.log("Icon is hovered");
                        instance.reference.addEventListener('mouseleave', () => {
                            instance.hide();
                            console.log("Hover ended, icon hidden");
                        });
                    },
                    placement: 'top',
                });
            }
            hoverIcon();



            const dragIcon = () => {
                interact('.floating-icon')
                    .draggable({
                        listeners: {
                            start(event) {
                                console.log("Icon dragging started");
                                document.getElementById('delete-icon').style.display = 'block';
                            },
                            move(event) {
                                const target = event.target;
                                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                                target.style.transform = `translate(${x}px, ${y}px)`;
                                target.setAttribute('data-x', x);
                                target.setAttribute('data-y', y);
                                console.log('Icon dragging Position');
                            },
                            end(event) {
                                console.log("Icon dragging ended")
                                document.getElementById('delete-icon').style.display = 'none';
                            }


                        }

                    });
            }
            dragIcon();


            const removeIcon = () => {
                interact('#delete-icon').dropzone({
                    ondrop(event) {
                        const star = event.relatedTarget;
                        star.remove();
                        console.log("Icon is removed")
                    }
                });
            }
            removeIcon();

        });
