import './style.css'
import Experience from './Experience/Experience.js'

window.experience = new Experience({
    targetElement: document.querySelector('.experience')
})

// Social Panel Controls
const socialPanel = document.getElementById('socialPanel')
const closeSocialPanel = document.getElementById('closeSocialPanel')
const infoTooltip = document.getElementById('infoTooltip')

// Close panel button
if(closeSocialPanel)
{
    closeSocialPanel.addEventListener('click', () =>
    {
        if(socialPanel)
        {
            socialPanel.classList.remove('active')
        }
    })
}

// Close panel when clicking outside
if(socialPanel)
{
    socialPanel.addEventListener('click', (e) =>
    {
        if(e.target === socialPanel)
        {
            socialPanel.classList.remove('active')
        }
    })
}

// Show info tooltip on load
if(infoTooltip)
{
    setTimeout(() =>
    {
        infoTooltip.classList.add('show')
        setTimeout(() =>
        {
            infoTooltip.classList.remove('show')
        }, 5000)
    }, 2000)
}

// Close panel with Escape key
document.addEventListener('keydown', (e) =>
{
    if(e.key === 'Escape' && socialPanel && socialPanel.classList.contains('active'))
    {
        socialPanel.classList.remove('active')
    }
})
