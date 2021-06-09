import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from pylab import mpl

y_tick=["256KB", "512KB", "1MB", "2MB", "4MB",  "8MB"]
#y_tick=["256KB", "512KB", "1MB", "2MB", "4MB",  "8MB"]
#x_tick=["5node","10node","15node","20node","25node","30node"]
#x_tick=["35node","40node","45node","50node","55node","60node"]
#x_tick=["10node","20node","30node","40node","50node","60node"]
#x_tick=["570\n600\n660", "760\n800\n880", "950\n100\n1100", "1140\n1200\n1320", "1330\n1400\n1540", "1520\n1600\n1760", "1710\n1800\n1980", "1900\n2000\n2200"]
#x_tick=["12\n18\n42", "14\n21\n49", "16\n24\n56", "18\n27\n63", "20\n30\n70", "22\n33\n77", "24\n36\n84", "26\n39\n91", "28\n42\n98", "30\n45\n105"]
#x_tick=["330\n360\n420", "440\n480\n560", "550\n600\n700", "660\n720\n840", "770\n840\n980", "880\n960\n1120", "990\n1080\n1260", "1100\n1200\n1400"]
#y_tick=["8MB", "4MB", "2MB", "1MB", "512KB", "256KB"]
#x_tick=["3 node TO1", "6 node TO1", "3 node TO2", "6 node TO2", "3 node TO3",  "6 node TO3"]
x_tick=["3 node TO2", "6 node TO2", "3 node TO3",  "6 node TO3"]

data = {}


import numpy as np

filename = 'TOaws2.txt'

ele = []
with open(filename) as file : 
	for line in file : 
		line = line.strip().split(',')
		ele.append(list(map(float,line)))
		
ele_array = np.array(ele)

file.close()

ele_array = np.array(ele_array).reshape(6,4)
print(ele_array)


pd_data=pd.DataFrame(ele_array, index=y_tick, columns=x_tick)

mpl.rcParams['font.family'] = 'sans-serif'
mpl.rcParams['font.sans-serif'] = 'NSimSun,Times New Roman'
font = {'family': 'sans-serif',
            'color': 'k',
            'weight': 'normal',
            'size': 20,}


f, ax = plt.subplots(figsize=(16, 8))
cmap = sns.cm.rocket_r  #colorbar颜色反转
ax = sns.heatmap(pd_data, annot=True, ax=ax, fmt='.2f', cmap=cmap) #画heatmap，具体参数可以查文档




plt.title("Time Out AWS",fontsize=30)
#plt.title("Time Out 3",fontsize=30)


#plt.title("16node commit together\nTwo -step / Msig",fontsize=30) #图片标题文本和字体大小
#plt.title("31node\n950 1000 1100",fontsize=30) #图片标题文本和字体大小


plt.xlabel("number of node",fontsize=17.5, color='k') #x轴label的文本和字体大小
plt.ylabel("data size",fontsize=17.5, color='k') #y轴label的文本和字体大小
plt.xticks(fontsize=15) #x轴刻度的字体大小（文本包含在pd_data中了）
plt.yticks(fontsize=15) #y轴刻度的字体大小（文本包含在pd_data中了）


#设置colorbar的刻度字体大小
cax = plt.gcf().axes[-1] 
cax.tick_params(labelsize=20)


#设置colorbar的label文本和字体大小
cbar = ax.collections[0].colorbar
#cbar.set_label("MB / s",fontdict=font)
cbar.set_label("ms",fontdict=font)


plt.show()
