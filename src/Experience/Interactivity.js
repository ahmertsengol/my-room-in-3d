import * as THREE from 'three'
import Experience from './Experience.js'

export default class Interactivity
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.config = this.experience.config
        this.targetElement = this.experience.targetElement
        this.navigation = this.experience.navigation

        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        this.clickableObjects = []
        this.hoveredObject = null

        this.setMouseEvents()
    }

    setMouseEvents()
    {
        this.onMouseMove = (_event) =>
        {
            // Normalize mouse coordinates to -1 to +1
            this.mouse.x = (_event.clientX / this.config.width) * 2 - 1
            this.mouse.y = -(_event.clientY / this.config.height) * 2 + 1

            this.checkIntersections()
        }

        this.wasDragging = false
        this.mouseDownPosition = { x: 0, y: 0 }

        this.onMouseDown = (_event) =>
        {
            this.mouseDownPosition.x = _event.clientX
            this.mouseDownPosition.y = _event.clientY
            this.wasDragging = false
        }

        this.onMouseClick = (_event) =>
        {
            // Check if user was dragging (moved more than 5 pixels)
            const dragDistance = Math.sqrt(
                Math.pow(_event.clientX - this.mouseDownPosition.x, 2) +
                Math.pow(_event.clientY - this.mouseDownPosition.y, 2)
            )

            if(dragDistance > 5)
            {
                return // User was dragging, don't trigger click
            }

            this.raycaster.setFromCamera(this.mouse, this.camera.instance)
            const intersects = this.raycaster.intersectObjects(this.clickableObjects, true)

            if(intersects.length > 0)
            {
                const clickedObject = intersects[0].object
                const clickableData = clickedObject.userData.clickable

                if(clickableData && clickableData.onClick)
                {
                    clickableData.onClick(clickedObject)
                }
            }
        }

        this.targetElement.addEventListener('mousemove', this.onMouseMove)
        this.targetElement.addEventListener('mousedown', this.onMouseDown)
        this.targetElement.addEventListener('click', this.onMouseClick)
    }

    checkIntersections()
    {
        this.raycaster.setFromCamera(this.mouse, this.camera.instance)
        const intersects = this.raycaster.intersectObjects(this.clickableObjects, true)

        if(intersects.length > 0)
        {
            const hoveredObject = intersects[0].object
            const clickableData = hoveredObject.userData.clickable

            if(this.hoveredObject !== hoveredObject)
            {
                // Remove previous hover
                if(this.hoveredObject && this.hoveredObject.userData.clickable && this.hoveredObject.userData.clickable.onHoverOut)
                {
                    this.hoveredObject.userData.clickable.onHoverOut(this.hoveredObject)
                }

                this.hoveredObject = hoveredObject

                // Add new hover
                if(clickableData && clickableData.onHover)
                {
                    clickableData.onHover(hoveredObject)
                }

                // Update cursor
                this.targetElement.classList.add('clickable')
            }
        }
        else
        {
            if(this.hoveredObject)
            {
                if(this.hoveredObject.userData.clickable && this.hoveredObject.userData.clickable.onHoverOut)
                {
                    this.hoveredObject.userData.clickable.onHoverOut(this.hoveredObject)
                }
                this.hoveredObject = null
                this.targetElement.classList.remove('clickable')
            }
        }
    }

    registerClickable(_mesh, _options = {})
    {
        if(!_mesh.userData)
        {
            _mesh.userData = {}
        }

        _mesh.userData.clickable = {
            onClick: _options.onClick || null,
            onHover: _options.onHover || null,
            onHoverOut: _options.onHoverOut || null,
            data: _options.data || null
        }

        this.clickableObjects.push(_mesh)
    }

    unregisterClickable(_mesh)
    {
        const index = this.clickableObjects.indexOf(_mesh)
        if(index > -1)
        {
            this.clickableObjects.splice(index, 1)
        }
    }

    update()
    {
        // Update mouse position for continuous checking
        // This is handled by mousemove event, but we can add additional logic here if needed
    }

    destroy()
    {
        this.targetElement.removeEventListener('mousemove', this.onMouseMove)
        this.targetElement.removeEventListener('mousedown', this.onMouseDown)
        this.targetElement.removeEventListener('click', this.onMouseClick)
    }
}

