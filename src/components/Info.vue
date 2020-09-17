<template>
    <div >
        <div v-b-modal.information class="button bg-black" style="position:fixed;bottom:2vw;left:2vw;z-index: 3;">
        <b-icon   icon="question"  variant="light" scale="2.7" shift-h="16" shift-v="-11"></b-icon>
        </div>
        <b-modal  size="lg" id="information" centered body-bg-variant="black" body-text-variant="light" hide-footer header-bg-variant="black" header-text-variant="light" header-border-variant="black" title="Info Center">
            <b-row class=" container">
                <b-col cols="4">
                    <h4>Keyboard Shortcuts</h4>
                    <hr/>
                    <ul class="mt-5">
                        <li>Moving around:
                        <ul>
                            <li><kbd><b-icon-arrow-up/> </kbd>, <kbd>W</kbd> Up </li>
                            <li> <kbd><b-icon-arrow-left/></kbd>, <kbd>A</kbd> Left</li>
                            <li><kbd><b-icon-arrow-down/></kbd>, <kbd>S</kbd> Down</li>
                            <li><kbd><b-icon-arrow-right/> </kbd>, <kbd>D</kbd> Right</li>

                        </ul>
                        </li>
                    </ul>
                </b-col>
                <b-col>
                    <h4>How To</h4>
                    <hr/>
                    <ul class="mt-5">
                        <li>Checking someone's status:
                        <ol>
                            <li>Right click or double tap on the person</li>
                            <li>Hit <kbd>Profile</kbd></li>
                        </ol>
                        </li>
                        <li>Editing a typo in your last sent message:
                        <ol>
                            <li>Place your cursor in the message box</li>
                            <li>Hit <kbd><b-icon-arrow-up/> </kbd> </li>
                        </ol>
                        </li>
                    </ul>
                </b-col>
            </b-row>
        </b-modal>
    </div>

</template>

<script>
    export default {
        name: "Info"
    }
</script>

<style scoped>
    .button:hover{
        background-color: #404040;

    }
    .button{
        cursor: pointer;
        width:3rem;height: 3rem;border-radius:50%;opacity:0.5;background-color: black;
    }
    hr{
        border-top-color:white;

    }
</style>
