console.log('Loading app_layout.js ...')


const border_width = 2;
const border_height = 2;

const layoutInner = [
    {
        type: "layoutGroup",
        orientation: "horizontal",
        width: '100%',
        items: [
            {
                type: "tabbedGroup",
                width: "20%",
                minWidth: 200,
                allowPin: false,
                items: [
                    {
                        type: "layoutPanel",
                        title: "DataSources",
                        contentContainer: "DataSourcesPanel"
                    },
                    {
                        type: "layoutPanel",
                        title: "TimeSeriesModels",
                        contentContainer: "TimeSeriesModelsPanel"
                    }
                ]
            },
            {
                type: "layoutGroup",
                orientation: "vertical",
                width: "80%",
                items: [
                    {
                        type: "tabbedGroup",
                        height: "80%",
                        minHeight: 200,
                        allowPin: false,
                        items: [
                            {
                                type: "layoutPanel",
                                title: "DataSource",
                                contentContainer: "DataSourcePanel"
                            },
                            {
                                type: "layoutPanel",
                                title: "TimeSeriesModel",
                                contentContainer: "TimeSeriesModelPanel"
                            },
                            {
                                type: "layoutPanel",
                                title: "IPredict",
                                contentContainer: "IPredictPanel"
                            },
                        ]
                    },
                    {
                        type: "tabbedGroup",
                        height: "20%",
                        pinnedHeight: 30,
                        items: [
                            {
                                type: "layoutPanel",
                                title: "Error List",
                                contentContainer: "ErrorListPanel"
                            },
                            {
                                type: "layoutPanel",
                                title: "Output",
                                contentContainer: "OutputPanel",
                                selected: true
                            }
                        ]
                    }
                ]
            },
            // {
            //     type: "autoHideGroup",
            //     alignment: "left",
            //     width: "10%",
            //     unpinnedWidth: 200,
            //     items: [
            //         {
            //             type: "layoutPanel",
            //             title: "Toolbox",
            //             contentContainer: "ToolboxPanel"
            //         },
            //         {
            //             type: "layoutPanel",
            //             title: "Help",
            //             contentContainer: "HelpPanel"
            //         }
            //     ]
            // },
        ]
    }
];

const layoutOuter = [
    {
        type: "layoutGroup",
        orientation: "horizontal",
        items: layoutInner
    }
];

const layout = layoutOuter;
