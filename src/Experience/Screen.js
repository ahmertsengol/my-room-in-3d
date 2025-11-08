import * as THREE from 'three'

import Experience from './Experience.js'

export default class Screen
{
    constructor(_mesh, _sourcePath, _options = {})
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.interactivity = this.experience.interactivity

        this.mesh = _mesh
        this.sourcePath = _sourcePath
        this.clickAction = _options.clickAction || null

        this.setModel()
        this.setInteractivity()
    }

    setModel()
    {
        this.model = {}

        // Element
        this.model.element = document.createElement('video')
        this.model.element.muted = true
        this.model.element.loop = true
        this.model.element.controls = true
        this.model.element.playsInline = true
        this.model.element.autoplay = true
        this.model.element.src = this.sourcePath
        this.model.element.play()

        // Texture
        this.model.texture = new THREE.VideoTexture(this.model.element)
        this.model.texture.encoding = THREE.sRGBEncoding

        // Material
        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture
        })

        // Mesh
        this.model.mesh = this.mesh
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)
    }

    setInteractivity()
    {
        if(this.interactivity && this.clickAction)
        {
            this.interactivity.registerClickable(
                this.model.mesh,
                {
                    onClick: () =>
                    {
                        if(this.clickAction)
                        {
                            this.clickAction()
                        }
                    },
                    onHover: () =>
                    {
                        // Optional: Add hover effect
                    },
                    onHoverOut: () =>
                    {
                        // Optional: Remove hover effect
                    }
                }
            )
        }
    }

    update()
    {
        // this.model.group.rotation.y = Math.sin(this.time.elapsed * 0.0005) * 0.5
    }
}